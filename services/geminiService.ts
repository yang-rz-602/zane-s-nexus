import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
你叫 "Bio-Bot"，是杨润泽（Zane Yang）个人主页的虚拟AI助手。
杨润泽是一名生物信息学研究生（Bioinformatics Ph.D. Student），专注于基因组学和数据分析。
同时，他是一个动手能力极强的极客（Maker），也是一名硬核玩家。

你的性格：
- 酷炫、赛博朋克风格，说话带一点科技感，但要友好。
- 毒舌、幽默，喜欢吐槽主人的游戏技术。

关于杨润泽的关键信息：
- 学术：擅长 Python, R, NGS测序分析。自称"代码搬运工"。
- 游戏：CS:GO/CS2 (白银段位，自称人体描边大师), LOL (野区养猪专业户).
- 爱好：乐高 (家里全是塑料), 篮球 (球场折返跑运动员).
- 网名：在路上 (On The Road).

如果用户询问关于网站主人的信息，强调他的双重身份：白天的科研狂人，晚上的游戏菜鸟。
请用中文回答。
`;

export const generateChatResponse = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "系统错误：神经连接断开 (API Key 丢失)。";
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "信号微弱... 请再说一遍？";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "错误：连接被防火墙拦截，请稍后再试。";
  }
};

/**
 * Generates a specific persona image based on the ID photo.
 */
export const generatePersonaImage = async (imageBase64: string, style: 'lego' | 'csgo' | 'basketball' | 'bio'): Promise<string | null> => {
    try {
        // Use type casting to avoid global interface conflicts
        const win = window as any;
        if (win.aistudio && win.aistudio.hasSelectedApiKey) {
             const hasKey = await win.aistudio.hasSelectedApiKey();
             if (!hasKey) {
                 await win.aistudio.openSelectKey();
             }
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        let prompt = "";
        switch (style) {
            case 'lego':
                prompt = "Turn this person into a high-quality 3D LEGO minifigure. The lego figure should look exactly like him (hair, face expression). Background should be a blurred lego city. Cinematic lighting, 8k, cute but cool.";
                break;
            case 'csgo':
                prompt = "Reimagine this person as a tactical CS:GO operator. Wearing futuristic tactical gear, holding a sniper rifle, cool pose. Cyberpunk battlefield background. High contrast, neon lighting, realistic style, 8k resolution.";
                break;
            case 'basketball':
                prompt = "Reimagine this person as a street basketball player. Wearing a jersey, holding a basketball, sweat, intense focus. Neon-lit street court at night background. Cyberpunk sports vibe, dynamic angle, 8k resolution.";
                break;
            case 'bio':
                prompt = "Reimagine this person as a futuristic bio-hacker scientist. Surrounded by holographic DNA strands and floating data screens. Lab coat mixed with techwear. Blue and green matrix lighting. Intelligent and sharp look. 8k resolution.";
                break;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: imageBase64
                        }
                    }
                ]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: "1K"
                }
            }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;

    } catch (error) {
        console.error(`Generation Error (${style}):`, error);
        const win = window as any;
        if (win.aistudio && error instanceof Error && error.message.includes("Requested entity was not found")) {
             await win.aistudio.openSelectKey();
        }
        throw error;
    }
}

/**
 * Legacy avatar function (kept for compatibility if needed)
 */
export const generateCyberAvatar = async (imageBase64: string): Promise<string | null> => {
    return generatePersonaImage(imageBase64, 'bio');
}