import React from 'react';
import { HobbyItem } from '../types';
import { Trophy, Crosshair, Hammer, Zap, Target } from 'lucide-react';

const hobbies: HobbyItem[] = [
  {
    id: '1',
    title: 'CS:GO / CS2',
    category: 'Gaming',
    description: '主打一个参与感。擅长使用P90进行人体描边。作为“经济局赞助商”，我为对面队伍的经济发展做出了不可磨灭的贡献。',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    stats: [
      { label: '真实段位', value: '白银' },
      { label: '绝活', value: 'Rush B' },
      { label: '闪光弹', value: '全白队友' }
    ]
  },
  {
    id: '2',
    title: '乐高积木工',
    category: 'LEGO',
    description: '家里没矿，但塑料管够。擅长看着说明书把一堆昂贵的ABS塑料拼成积灰的摆件。自称“结构大师”，实则“缺件焦虑症”晚期。',
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=1000&auto=format&fit=crop',
    stats: [
      { label: '败家指数', value: 'MAX' },
      { label: '指尖痛感', value: '100%' },
      { label: '丢失零件', value: '无数' }
    ]
  },
  {
    id: '3',
    title: '球场折返跑',
    category: 'Sports',
    description: '篮球场上的气氛组组长。主要负责发球和在两个篮筐之间进行有氧折返跑。偶尔能进个三分，能吹一年。',
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-92002639313cc?q=80&w=1000&auto=format&fit=crop',
    stats: [
      { label: '得分', value: '看天' },
      { label: '装备', value: '专业' },
      { label: '技术', value: '入门' }
    ]
  },
  {
    id: '4',
    title: '英雄联盟 LOL',
    category: 'Gaming',
    description: '野区养猪专业户——不仅养对面的猪，偶尔也养对面的打野。Q技能精准度与彩票中奖率相当。团战主要负责喊“救命”。',
    imageUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1000&auto=format&fit=crop',
    stats: [
      { label: '手速', value: '老年' },
      { label: '意识', value: '模糊' },
      { label: '嘴硬', value: '王者' }
    ]
  }
];

const Hobbies: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#0a0a0a] border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
                <div className="bg-neon-purple p-2 rounded shadow-[0_0_15px_rgba(188,19,254,0.5)] text-black">
                     <Target size={24} fill="currentColor" />
                </div>
                <div>
                    <h2 className="text-4xl font-display text-white tracking-wide">杂学家认证</h2>
                    <p className="text-neon-purple font-mono text-sm mt-1 tracking-widest">/// JACK_OF_ALL_TRADES</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hobbies.map((hobby) => (
            <div key={hobby.id} className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-white/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              
              {/* Image Header */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-neon-green/0 group-hover:bg-neon-green/10 transition-colors z-10 duration-500"></div>
                <img 
                  src={hobby.imageUrl} 
                  alt={hobby.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                  {hobby.category === 'Gaming' && <Crosshair className="text-neon-green" size={18}/>}
                  {hobby.category === 'LEGO' && <Hammer className="text-yellow-500" size={18}/>}
                  {hobby.category === 'Sports' && <Trophy className="text-orange-500" size={18}/>}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-20 -mt-6">
                <div className="bg-gray-900/95 backdrop-blur border border-gray-800 p-4 rounded-xl shadow-lg group-hover:border-gray-600 transition-colors min-h-[200px] flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg font-bold text-white font-sans group-hover:text-neon-green transition-colors">{hobby.title}</h3>
                         <span className="text-[10px] font-mono text-gray-400 border border-gray-700 px-1.5 py-0.5 rounded uppercase">{hobby.category}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-4 leading-relaxed flex-grow">
                        {hobby.description}
                    </p>

                    {/* Stats Grid */}
                    {hobby.stats && (
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-800 pt-3 mt-auto">
                        {hobby.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">{stat.label}</div>
                            <div className="text-sm font-bold text-white font-display tracking-wide">{stat.value}</div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;