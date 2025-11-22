import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Cpu } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage, ChatRole } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "你好，我是 Bio-Bot。想了解杨润泽的学术研究、CS:GO 战绩，还是最近拼了什么乐高？", timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    const newUserMsg: ChatMessage = { role: ChatRole.USER, text: userText, timestamp: Date.now() };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Format history for Gemini
      const historyForApi = messages.map(m => ({
        role: m.role === ChatRole.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(historyForApi, userText);
      
      setMessages(prev => [...prev, {
        role: ChatRole.MODEL,
        text: responseText,
        timestamp: Date.now()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: ChatRole.MODEL,
        text: "系统故障。请重试。",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-gray-900/95 backdrop-blur-xl border border-neon-green/30 rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
          
          {/* Header */}
          <div className="bg-gray-800/80 p-3 flex justify-between items-center border-b border-neon-green/20">
            <div className="flex items-center space-x-2 text-neon-green">
              <Cpu size={18} />
              <span className="font-bold text-sm tracking-wider font-mono">SYSTEM_LINK_V2.0</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === ChatRole.USER 
                    ? 'bg-neon-blue/10 border border-neon-blue/30 text-neon-blue rounded-br-none' 
                    : 'bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-bl-none'
                }`}>
                   {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-neon-green/10 border border-neon-green/30 p-3 rounded-lg rounded-bl-none flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-gray-800/50 border-t border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入指令..."
              className="flex-1 bg-black/50 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-green transition-colors"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isLoading}
              className="p-2 bg-neon-green/20 hover:bg-neon-green/40 text-neon-green rounded border border-neon-green/50 transition-all disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg shadow-neon-green/20 border transition-all duration-300 group ${
          isOpen 
            ? 'bg-gray-800 border-gray-600 text-gray-400 rotate-90 opacity-0 pointer-events-none absolute' 
            : 'bg-black border-neon-green text-neon-green hover:scale-110 hover:shadow-neon-green/50'
        }`}
      >
        <Bot size={28} className="animate-pulse-fast" />
      </button>
      {!isOpen && (
         <div className="absolute bottom-20 right-0 bg-black/80 text-xs text-neon-green px-3 py-1 rounded border border-neon-green/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-mono">
            呼叫 Bio-Bot
         </div>
      )}
    </div>
  );
};

export default AIAssistant;