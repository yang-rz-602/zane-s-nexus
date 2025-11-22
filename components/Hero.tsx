import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  // Sharp, self-deprecating titles
  const roles = [
    "生物圈的代码搬运工", 
    "CS:GO 人体描边大师", 
    "乐高贫困收藏家", 
    "全能型... 菜鸟"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        setDisplayText(prev => prev.substring(0, prev.length - 1));
      } else {
        setDisplayText(prev => currentRole.substring(0, prev.length + 1));
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/90 to-[#050505]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl">
        <div className="flex justify-center mb-8 relative">
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-neon-green blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>
            {/* Hero Avatar - Static or Placeholder */}
            <div className="w-32 h-32 rounded-full border-2 border-neon-green/50 p-1 relative overflow-hidden group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                     <img 
                       src="https://api.dicebear.com/9.x/avataaars/svg?seed=Runze&backgroundColor=b6e3f4" 
                       alt="Avatar" 
                       className="w-full h-full object-cover"
                     />
                </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black border border-neon-green text-neon-green text-[10px] px-2 py-0.5 rounded-full font-mono">
                BIO-V2.0
            </div>
          </div>
        </div>
        
        <div className="glitch-wrapper mb-2">
          <h1 
            className="text-7xl md:text-9xl font-display font-black text-white tracking-wider glitch-text" 
            data-text="杨润泽"
          >
            杨润泽
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 tracking-[0.2em] mb-8 uppercase">
          Zane Yang
        </h2>

        <div className="h-20 mb-10 flex justify-center items-center">
          <div className="bg-gray-900/80 border border-gray-800 px-6 py-4 rounded-lg backdrop-blur-sm border-l-4 border-l-neon-green shadow-[0_0_15px_rgba(0,255,157,0.1)] max-w-2xl w-full">
            <p className="text-lg md:text-xl font-mono text-neon-green truncate">
              <span className="text-gray-500 mr-2">&gt; 当前状态:</span>
              {displayText}<span className="animate-pulse text-neon-purple">_</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[10px] font-mono text-neon-green tracking-widest animate-pulse">SCROLL_DOWN</span>
        <ChevronDown className="text-white w-6 h-6 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;