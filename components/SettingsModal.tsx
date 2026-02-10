import React, { useRef } from 'react';
import { Language } from '../translations';

interface UserRecord {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  createdAt: string;
  lastLogin: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserRecord;
  onUpdateAvatar: (newAvatar: string) => void;
  onLogout: () => void;
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  onShowToast: (msg: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, onClose, user, onUpdateAvatar, onLogout
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpdateAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative w-full h-full sm:h-[90vh] sm:max-w-[550px] bg-[#0c0c0e] text-white sm:rounded-[3rem] shadow-2xl border border-white/5 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-zinc-900/20">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00D1FF]">Perfil do Usuário</h2>
            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">Configurações de Conta</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
          
          <section className="bg-gradient-to-br from-white/[0.03] to-transparent p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 rounded-[2rem] bg-zinc-900 flex items-center justify-center text-4xl overflow-hidden ring-4 ring-[#00D1FF]/20 cursor-pointer shrink-0 relative group"
            >
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span>👤</span>}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                <span className="text-[8px] font-black uppercase tracking-tighter">Editar</span>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>
            <div className="min-w-0">
              <h3 className="text-2xl font-black tracking-tighter truncate">{user.name}</h3>
              <p className="text-sm text-gray-500 font-medium truncate mb-4">{user.email}</p>
              <div className="flex gap-2">
                <span className="text-[8px] font-black px-3 py-1 bg-zinc-800 text-gray-400 rounded-full uppercase tracking-widest border border-white/5">Ativo</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">ID da Conta</p>
                <p className="text-[11px] font-mono text-gray-400">{user.id}</p>
             </div>
             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Data de Ingresso</p>
                <p className="text-[11px] font-bold text-gray-300">{user.createdAt}</p>
             </div>
          </section>

          <div className="pt-6">
            <button onClick={onLogout} className="w-full py-6 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500 font-black text-[10px] uppercase tracking-[0.5em] rounded-3xl transition-all">Sair da Conta</button>
          </div>
        </div>
        
        <div className="p-8 bg-zinc-900/40 border-t border-white/5 flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            MONTFLIX Cloud Synchronization Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;