import React, { useState } from 'react';
import { ScreenType } from '../types';
import { APP_ASSETS } from '../mockData';

interface NavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenDrawer: () => void;
  leadsCount: number;
}

export const Header: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Open drawer menu"
            onClick={onOpenDrawer}
            className="w-10 h-10 flex items-center justify-center text-[#0b1c30] rounded-lg hover:bg-[#e5eeff] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <button 
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <img
              alt="Orken AI Logo"
              className="h-8 w-auto object-contain"
              src={APP_ASSETS.logo}
            />
            <span className="text-[#0b1c30] font-bold text-lg tracking-tight">
              Orken AI
            </span>
          </button>

          {/* Quick Screen Pill Switcher for Easy Review */}
          <div className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-[#e5eeff]">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentScreen === 'landing' ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-[#eff4ff]'
              }`}
            >
              Public Website
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentScreen === 'overview' ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-[#eff4ff]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('leads')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentScreen === 'leads' ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-[#eff4ff]'
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => onNavigate('chats')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentScreen === 'chats' ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-[#eff4ff]'
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => onNavigate('agents')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentScreen === 'agents' ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-[#eff4ff]'
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentScreen === 'knowledge' ? 'bg-[#3525cd] text-white' : 'text-[#464555] hover:bg-[#eff4ff]'
              }`}
            >
              Knowledge Base
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Notifications button */}
          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 flex items-center justify-center text-[#464555] hover:text-[#0b1c30] rounded-lg hover:bg-[#e5eeff] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4f46e5] ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#e5eeff] py-2 z-50">
                <div className="px-3 py-2 border-b border-[#eff4ff] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">Recent Activity</span>
                  <span className="text-[10px] bg-[#eff4ff] text-[#3525cd] px-1.5 py-0.5 rounded font-semibold">3 Unread</span>
                </div>
                <div className="divide-y divide-[#eff4ff] max-h-72 overflow-y-auto">
                  <div 
                    onClick={() => { onNavigate('leads'); setShowNotifications(false); }}
                    className="p-3 hover:bg-[#eff4ff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30]">New Qualified Lead</span>
                      <span className="text-[10px] text-[#565e74]">2m ago</span>
                    </div>
                    <p className="text-xs text-[#464555] mt-0.5">Sarah Jenkins (+1 555-382-9912) from Vertex Cloud captured by Sales Agent v2.</p>
                  </div>
                  <div 
                    onClick={() => { onNavigate('chats'); setShowNotifications(false); }}
                    className="p-3 hover:bg-[#eff4ff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30]">Chat Escalation Request</span>
                      <span className="text-[10px] text-[#565e74]">28m ago</span>
                    </div>
                    <p className="text-xs text-[#464555] mt-0.5">Visitor #8819 requested live human review on compliance.</p>
                  </div>
                </div>
                <div className="p-2 border-t border-[#eff4ff] text-center">
                  <button 
                    onClick={() => { onNavigate('leads'); setShowNotifications(false); }}
                    className="text-xs text-[#3525cd] font-semibold hover:underline"
                  >
                    View All Activity Log
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              aria-label="Profile Menu"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-[#4f46e5]/40 transition-all"
              type="button"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-sm"
                src={APP_ASSETS.avatar}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e5eeff] py-1 z-50">
                <div className="px-4 py-2.5 border-b border-[#eff4ff]">
                  <p className="text-xs font-bold text-[#0b1c30]">Elena Vance</p>
                  <p className="text-[11px] text-[#565e74]">elena.vance@orken.ai</p>
                  <span className="mt-1 inline-block text-[10px] font-semibold bg-[#e2dfff] text-[#3323cc] px-1.5 py-0.2 rounded">
                    Super Administrator
                  </span>
                </div>
                <button
                  onClick={() => { onNavigate('settings'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-[#0b1c30] hover:bg-[#eff4ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#565e74]">settings</span>
                  <span>Console Settings</span>
                </button>
                <button
                  onClick={() => { onNavigate('knowledge'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-[#0b1c30] hover:bg-[#eff4ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#565e74]">menu_book</span>
                  <span>Knowledge Base</span>
                </button>
                <button
                  onClick={() => { onNavigate('landing'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-[#0b1c30] hover:bg-[#eff4ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#565e74]">visibility</span>
                  <span>View Public Website</span>
                </button>
                <div className="border-t border-[#eff4ff] my-1"></div>
                <button
                  onClick={() => { onNavigate('login'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export const BottomNav: React.FC<{
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-[#e5eeff]">
      <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
        <button
          onClick={() => onNavigate('overview')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'overview'
              ? 'text-[#4f46e5] font-semibold'
              : 'text-[#464555] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          <span className="text-[11px] mt-0.5">Overview</span>
        </button>

        <button
          onClick={() => onNavigate('leads')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'leads'
              ? 'text-[#4f46e5] font-semibold'
              : 'text-[#464555] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">group_add</span>
          <span className="text-[11px] mt-0.5">Leads</span>
        </button>

        <button
          onClick={() => onNavigate('chats')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'chats'
              ? 'text-[#4f46e5] font-semibold'
              : 'text-[#464555] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">chat</span>
          <span className="text-[11px] mt-0.5">Chats</span>
        </button>

        <button
          onClick={() => onNavigate('agents')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'agents'
              ? 'text-[#4f46e5] font-semibold'
              : 'text-[#464555] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">smart_toy</span>
          <span className="text-[11px] mt-0.5">Agents</span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentScreen === 'settings'
              ? 'text-[#4f46e5] font-semibold'
              : 'text-[#464555] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span className="text-[11px] mt-0.5">Settings</span>
        </button>
      </div>
    </nav>
  );
};
