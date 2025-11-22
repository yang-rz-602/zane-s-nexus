import React from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import PhotoWall from './components/PhotoWall';
import AIAssistant from './components/AIAssistant';
import { Github, Linkedin, Mail, Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-neon-green selection:text-black">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-[#050505]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo Update: Highlight '在路上' */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-neon-green/10 p-2 rounded border border-neon-green/30 group-hover:bg-neon-green/20 transition-all">
               <Zap className="text-neon-green w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display tracking-widest text-2xl leading-none text-white group-hover:text-neon-green transition-colors">
                在路上
              </span>
              <span className="font-mono text-[10px] text-gray-500 tracking-[0.3em] group-hover:text-neon-blue transition-colors">
                ON THE ROAD
              </span>
            </div>
          </div>
          
          <div className="flex gap-6 text-sm font-mono text-gray-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-neon-green transition-colors flex items-center gap-2 group">
              <Github size={18} className="group-hover:-translate-y-1 transition-transform" /> <span className="hidden md:inline">GITHUB</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-neon-blue transition-colors flex items-center gap-2 group">
              <Linkedin size={18} className="group-hover:-translate-y-1 transition-transform" /> <span className="hidden md:inline">LINKEDIN</span>
            </a>
            <a href="mailto:zane@example.com" className="hover:text-neon-purple transition-colors flex items-center gap-2 group">
              <Mail size={18} className="group-hover:-translate-y-1 transition-transform" /> <span className="hidden md:inline">CONTACT</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <PhotoWall />
        <Skills />
        <Hobbies />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto text-center font-mono text-gray-600 text-sm relative z-10">
          <p className="mb-4 text-lg font-display text-gray-400">Zane Yang | 在路上</p>
          <p>&copy; {new Date().getFullYear()} Runze Yang. All Systems Operational.</p>
          <p className="mt-2 opacity-50 text-xs">
             Deployed on <span className="text-white">GitHub Pages</span> | Powered by <span className="text-neon-blue">React</span> + <span className="text-neon-green">Gemini 3 Pro</span>
          </p>
        </div>
      </footer>

      {/* AI Chat Bot */}
      <AIAssistant />
    </div>
  );
};

export default App;