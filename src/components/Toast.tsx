import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#213145] text-[#eaf1ff] px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/10 pointer-events-none">
      <span className="material-symbols-outlined text-[18px] text-[#4fdbc8]">{icon}</span>
      <span>{message}</span>
    </div>
  );
};
