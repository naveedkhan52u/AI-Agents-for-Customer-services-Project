import React from 'react';
import { ScreenType } from '../types';
import { APP_ASSETS } from '../mockData';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  leadsCount: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
  leadsCount,
}) => {
  if (!isOpen) return null;

  const navItems: { screen: ScreenType; label: string; icon: string; badge?: string }[] = [
    { screen: 'overview', label: 'Dashboard Overview', icon: 'dashboard' },
    { screen: 'leads', label: 'Lead Generation', icon: 'group_add', badge: `${leadsCount}` },
    { screen: 'chats', label: 'Conversations & Logs', icon: 'chat', badge: '14 Live' },
    { screen: 'agents', label: 'AI Agents Engine', icon: 'smart_toy', badge: '5 Active' },
    { screen: 'knowledge', label: 'Knowledge Base', icon: 'menu_book', badge: 'v2.4' },
    { screen: 'settings', label: 'Settings & Security', icon: 'settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-72 sm:w-80 bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-[#eff4ff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={APP_ASSETS.logo}
                alt="Orken AI"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <div>
                <span className="font-bold text-base text-[#0b1c30] tracking-tight block">
                  Orken AI
                </span>
                <span className="text-[10px] text-[#4f46e5] font-semibold bg-[#eff4ff] px-1.5 py-0.2 rounded">
                  Intelligence Console
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#565e74] hover:bg-[#eff4ff]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* User pill */}
          <div className="p-3.5 mx-3 mt-3 bg-[#eff4ff] rounded-xl flex items-center gap-3">
            <img
              src={APP_ASSETS.avatar}
              alt="Elena Vance"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-[#0b1c30] truncate">Elena Vance</h4>
              <p className="text-[11px] text-[#565e74] truncate">elena.vance@orken.ai</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#00534a] font-medium mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8]"></span>
                Console Active
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#777587]">
              Main Workspace
            </div>
            {navItems.map((item) => {
              const active = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    onNavigate(item.screen);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#4f46e5] text-white shadow-sm'
                      : 'text-[#464555] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-[#e5eeff] text-[#3525cd]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#777587]">
              Customer Touchpoints
            </div>
            <button
              onClick={() => {
                onNavigate('landing');
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-[#464555] hover:bg-[#eff4ff] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[20px] text-[#3525cd]">globe</span>
              <span>Public Landing Page</span>
            </button>
            <button
              onClick={() => {
                onNavigate('login');
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-[#464555] hover:bg-[#eff4ff] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[20px] text-[#3525cd]">lock</span>
              <span>Admin Auth Portal</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#eff4ff] bg-[#f8f9ff]">
          <div className="flex items-center justify-between text-xs text-[#565e74]">
            <span>Active Node</span>
            <span className="font-semibold text-[#0b1c30]">US-East-4</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#565e74] mt-1">
            <span>Operational SLA</span>
            <span className="font-semibold text-[#006d62]">99.98%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
