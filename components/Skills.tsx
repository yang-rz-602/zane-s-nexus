import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { SkillData } from '../types';
import { Database, Code, Activity, Terminal, Biohazard } from 'lucide-react';

const skills: SkillData[] = [
  { subject: 'Python (CV大法)', A: 90, fullMark: 100 },
  { subject: 'R 语言 (画图匠)', A: 85, fullMark: 100 },
  { subject: '生物学 (背书)', A: 80, fullMark: 100 },
  { subject: '前端 (拼凑)', A: 70, fullMark: 100 },
  { subject: '硬件 (炸机)', A: 95, fullMark: 100 },
  { subject: 'Linux (删库)', A: 88, fullMark: 100 },
];

const Skills: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#050505] relative border-t border-gray-900/50 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-neon-purple/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="font-sans">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-neon-green/10 rounded border border-neon-green/30">
                 <Activity className="text-neon-green w-6 h-6" />
              </div>
              <h2 className="text-4xl font-display text-white tracking-wide">技能树 <span className="text-neon-green text-lg font-mono ml-2">/// SKILL_TREE_BETA</span></h2>
            </div>
            
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              主要工作是把<span className="text-white font-bold">ATCG</span>四个字母排列组合。
              虽然自称 Bioinformatician，但日常更像是一个 <span className="text-neon-green bg-neon-green/10 px-1">高级 CSV 文件管理员</span>。
              擅长用最复杂的代码解决最简单的问题。
            </p>
            
            <div className="space-y-5 font-mono">
              <div className="bg-gray-900/40 border border-gray-800 hover:border-neon-blue hover:bg-gray-900/80 p-5 rounded-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 text-neon-blue mb-2">
                  <Biohazard size={22} />
                  <h3 className="font-bold text-lg">生物信息 & 数据</h3>
                </div>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                  NGS 流程搭建 (报错调试员), PyMol (蛋白质美工), BLAST (序列搬运)
                </p>
              </div>
              
              <div className="bg-gray-900/40 border border-gray-800 hover:border-neon-purple hover:bg-gray-900/80 p-5 rounded-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 text-neon-purple mb-2">
                  <Code size={22} />
                  <h3 className="font-bold text-lg">全栈 (半桶水) 开发</h3>
                </div>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                  React (只会抄组件), Tailwind (样式全靠试), Python (面向StackOverflow编程)
                </p>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 hover:border-neon-green hover:bg-gray-900/80 p-5 rounded-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 text-neon-green mb-2">
                  <Terminal size={22} />
                  <h3 className="font-bold text-lg">生存工具</h3>
                </div>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                  VIM (只会 :wq), Git (只会 push -f), Google (核心竞争力)
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[450px] w-full bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-md relative shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div className="absolute top-6 right-6 text-xs font-mono text-neon-green border border-neon-green/30 px-2 py-1 rounded bg-neon-green/5">
                STATUS: UNSTABLE
             </div>
             
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skills}>
                <PolarGrid stroke="#333" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#e2e8f0', fontSize: 13, fontFamily: '"Noto Sans SC", sans-serif', fontWeight: 500 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="真实水平"
                  dataKey="A"
                  stroke="#00ff9d"
                  strokeWidth={3}
                  fill="#00ff9d"
                  fillOpacity={0.15}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#00ff9d', color: '#fff', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#00ff9d' }}
                  cursor={{ stroke: '#00f3ff', strokeWidth: 1 }}
                />
              </RadarChart>
            </ResponsiveContainer>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-700 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-700 rounded-br-lg"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;