import React, { useState, useEffect, useRef } from 'react';
import { getMovieRecommendation } from '../services/geminiService';
import { Movie, ChatMessage } from '../services/types';
import { Language } from '../translations';

interface AISearchProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: Movie[];
  language: Language;
  userEmail?: string;
}

const AISearch: React.FC<AISearchProps> = ({ isOpen, onClose, catalog, language, userEmail }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userName = userEmail ? userEmail.split('@')[0] : 'usuário';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: 'model', 
          text: language === 'pt' 
            ? `Olá, ${userName}! Sou o Alex, o curador oficial da MONTFLIX. Estou aqui para te ajudar a encontrar o filme perfeito no nosso catálogo 100% gratuito. O que vamos assistir hoje?` 
            : `Hello, ${userName}! I'm Alex, MONTFLIX's official curator. I'm here to help you find the perfect movie in our 100% free catalog. What shall we watch today?` 
        }
      ]);
    }
  }, [isOpen, userName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getMovieRecommendation(userMsg, catalog, language);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#0a0a0b] border-l border-white/5 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
        
        <div className="p-8 border-b border-white/5 bg-[#0d0d0f] flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-3xl shadow-xl border border-white/10 overflow-hidden ring-2 ring-[#00D1FF]/40">
                👨‍💼
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0d0d0f] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-black text-xl tracking-tighter uppercase">Alex</h2>
                <span className="bg-[#00D1FF] text-black text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Curador Oficial</span>
              </div>
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Especialista em Catálogo Gratuito</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all">✕</button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
              <div className={`max-w-[85%] rounded-3xl p-6 text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-[#00D1FF] text-black font-bold rounded-tr-none' 
                  : 'bg-[#141417] text-gray-300 border border-white/5 rounded-tl-none shadow-lg'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-3 ml-2 animate-pulse">
               <div className="w-8 h-4 bg-white/5 rounded-full flex items-center justify-center gap-1">
                 <div className="w-1 h-1 bg-[#00D1FF] rounded-full animate-bounce" />
                 <div className="w-1 h-1 bg-[#00D1FF] rounded-full animate-bounce [animation-delay:0.2s]" />
               </div>
               <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Digitando...</span>
            </div>
          )}
        </div>

        <div className="p-8 bg-[#0d0d0f] border-t border-white/5">
          <div className="flex gap-3 items-center bg-black/40 p-3 rounded-2xl border border-white/5 focus-within:border-[#00D1FF]/40 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder='O que vamos assistir hoje?'
              className="flex-1 bg-transparent border-none px-4 py-2 text-white focus:outline-none text-sm placeholder:text-gray-800 font-bold"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-12 h-12 bg-[#00D1FF] text-black rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-20 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearch;