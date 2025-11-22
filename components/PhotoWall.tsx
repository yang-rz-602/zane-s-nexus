import React, { useState, useEffect } from 'react';
import { Upload, Loader2, Image as ImageIcon, Save, RefreshCcw } from 'lucide-react';
import { generatePersonaImage } from '../services/geminiService';

interface PersonaImage {
  id: string;
  style: 'lego' | 'csgo' | 'basketball' | 'bio';
  url: string | null;
  label: string;
  color: string;
}

const PhotoWall: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<PersonaImage[]>([
    { id: '1', style: 'bio', url: null, label: 'BIO_HACKER // 生物黑客', color: 'text-neon-green' },
    { id: '2', style: 'csgo', url: null, label: 'TACTICAL_OPS // 特勤干员', color: 'text-neon-red' },
    { id: '3', style: 'lego', url: null, label: 'BLOCK_MASTER // 乐高大师', color: 'text-yellow-400' },
    { id: '4', style: 'basketball', url: null, label: 'STREET_BALLER // 街头球手', color: 'text-neon-blue' },
  ]);

  // Load from local storage on mount to persist between reloads (simulating "placed on website")
  useEffect(() => {
    const saved = localStorage.getItem('zane_cyber_photos');
    if (saved) {
      setGeneratedImages(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAll = async () => {
    if (!sourceImage) return;
    
    const base64Data = sourceImage.split(',')[1];
    setIsGenerating(true);
    
    const newImages = [...generatedImages];
    
    try {
      // Generate sequentially to avoid rate limits or overwhelming the browser
      for (let i = 0; i < newImages.length; i++) {
        if (!newImages[i].url) { // Only generate if empty
            const result = await generatePersonaImage(base64Data, newImages[i].style);
            if (result) {
                newImages[i].url = result;
                setGeneratedImages([...newImages]); // Update state progressively
            }
        }
      }
      // Save to local storage
      localStorage.setItem('zane_cyber_photos', JSON.stringify(newImages));
    } catch (e) {
      console.error(e);
      alert("生成过程中断。请检查API Key或稍后重试。");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearImages = () => {
      if(confirm("确定要清除所有生成的图片吗？")) {
          localStorage.removeItem('zane_cyber_photos');
          setGeneratedImages(generatedImages.map(img => ({...img, url: null})));
          setSourceImage(null);
      }
  }

  const hasImages = generatedImages.some(img => img.url !== null);

  return (
    <section className="py-12 bg-[#050505] relative border-b border-gray-900">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-display text-white tracking-widest">
                        平行宇宙 <span className="text-neon-blue text-xl">/// MULTIVERSE</span>
                    </h2>
                    <p className="text-gray-500 font-mono text-sm mt-2">
                        Zane's Variants detected in the Nexus.
                    </p>
                </div>
                
                {/* Control Panel (Only visible if no images or explicitly reset) */}
                <div className="flex gap-2">
                    {hasImages && (
                         <button onClick={clearImages} className="p-2 text-gray-600 hover:text-red-500 transition-colors" title="Reset Gallery">
                             <RefreshCcw size={16} />
                         </button>
                    )}
                </div>
            </div>

            {/* Setup Area - Show this if no images generated yet */}
            {!hasImages && (
                <div className="border border-dashed border-gray-700 bg-gray-900/50 rounded-xl p-8 text-center mb-12 animate-in fade-in">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto flex items-center justify-center border border-gray-600">
                            <Upload className="text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">初始化视觉档案</h3>
                            <p className="text-gray-400 text-sm">
                                上传您的证件照，Gemini 3 Pro 将为您生成全套赛博风格展示图。<br/>
                                (乐高、CSGO特勤、街头篮球、生物黑客)
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-blue/10 file:text-neon-blue hover:file:bg-neon-blue/20 cursor-pointer" 
                            />
                            <button 
                                onClick={generateAll}
                                disabled={!sourceImage || isGenerating}
                                className="w-full py-3 bg-neon-blue text-black font-bold rounded hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isGenerating ? <Loader2 className="animate-spin" /> : <ImageIcon size={18} />}
                                {isGenerating ? '正在生成平行宇宙分身...' : '立即生成 (Generate Assets)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {generatedImages.map((img) => (
                    <div key={img.id} className="group relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-white/50 transition-all duration-300">
                        {img.url ? (
                            <>
                                <img 
                                    src={img.url} 
                                    alt={img.style} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <div className={`font-mono text-xs font-bold ${img.color} mb-1 tracking-wider`}>
                                        {img.label}
                                    </div>
                                    <div className="w-full h-0.5 bg-white/20">
                                        <div className="h-full bg-white w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                                    </div>
                                </div>
                                {/* Glitch effect on hover */}
                                <div className="absolute inset-0 bg-neon-green/20 mix-blend-overlay opacity-0 group-hover:animate-pulse pointer-events-none"></div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center opacity-30">
                                <Loader2 className={`w-8 h-8 mb-2 ${isGenerating ? 'animate-spin text-neon-blue' : 'text-gray-600'}`} />
                                <span className="text-xs font-mono text-gray-500">{isGenerating ? 'GENERATING...' : 'NO DATA'}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default PhotoWall;