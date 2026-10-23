import { useState, useEffect } from 'react';
import { ScreenType, Lead, LeadStatus, AgentConfig, KnowledgeDocument } from './types';
import {
  INITIAL_LEADS,
  INITIAL_CONVERSATIONS,
  INITIAL_AGENTS,
  INITIAL_KNOWLEDGE_DOCS,
} from './mockData';
import { Header, BottomNav } from './components/Navigation';
import { SidebarDrawer } from './components/SidebarDrawer';
import { LandingPage } from './components/LandingPage';
import { AdminLogin } from './components/AdminLogin';
import { DashboardOverview } from './components/DashboardOverview';
import { LeadsView } from './components/LeadsView';
import { AgentsView } from './components/AgentsView';
import { ConversationsView } from './components/ConversationsView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { SettingsView } from './components/SettingsView';
import { Toast } from './components/Toast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [conversations] = useState(INITIAL_CONVERSATIONS);
  const [agents, setAgents] = useState<AgentConfig[]>(INITIAL_AGENTS);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(INITIAL_KNOWLEDGE_DOCS);
  const [selectedConvId, setSelectedConvId] = useState<string>('conv-1');
  const [activeDrawerLead, setActiveDrawerLead] = useState<Lead | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ message: string; icon?: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Lead handlers
  const handleAddLead = (newLeadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (activeDrawerLead && activeDrawerLead.id === id) {
      setActiveDrawerLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (activeDrawerLead && activeDrawerLead.id === id) {
      setActiveDrawerLead(null);
    }
  };

  const handleAddNote = (leadId: string, noteText: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      text: noteText,
      time: 'Just now',
    };
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, notes: [newNote, ...(l.notes || [])] }
          : l
      )
    );
    if (activeDrawerLead && activeDrawerLead.id === leadId) {
      setActiveDrawerLead((prev) =>
        prev ? { ...prev, notes: [newNote, ...(prev.notes || [])] } : null
      );
    }
  };

  // Agent handlers
  const handleUpdateAgent = (updated: AgentConfig) => {
    setAgents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleAddAgent = (newAg: AgentConfig) => {
    setAgents((prev) => [newAg, ...prev]);
  };

  // Knowledge base handlers
  const handleAddDocument = (doc: KnowledgeDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Handle drawer lead selection
  const handleSelectLeadForDrawer = (lead: Lead) => {
    setActiveDrawerLead(lead);
  };

  // Is console view
  const isConsole = currentScreen !== 'landing' && currentScreen !== 'login';

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#4f46e5]/20">
      {/* Quick switcher bar for easy navigation between all 8 screens */}
      <div className="bg-[#0b1c30] text-white px-3 py-1.5 text-xs flex items-center justify-between z-50 overflow-x-auto no-scrollbar shadow-md">
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-bold flex items-center gap-1 text-[#71f8e4]">
            <span className="material-symbols-outlined text-[16px]">devices</span>
            Screens:
          </span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setCurrentScreen('landing')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'landing' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            1. Website
          </button>
          <button
            onClick={() => setCurrentScreen('login')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'login' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            2. Admin Login
          </button>
          <button
            onClick={() => setCurrentScreen('overview')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'overview' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            3. Dashboard
          </button>
          <button
            onClick={() => setCurrentScreen('leads')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'leads' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            4. Leads ({leads.length})
          </button>
          <button
            onClick={() => setCurrentScreen('chats')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'chats' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            5. Chats
          </button>
          <button
            onClick={() => setCurrentScreen('agents')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'agents' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            6. AI Agents
          </button>
          <button
            onClick={() => setCurrentScreen('knowledge')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'knowledge' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            7. Knowledge Base
          </button>
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              currentScreen === 'settings' ? 'bg-[#3525cd] text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            8. Settings
          </button>
        </div>
      </div>

      {/* Console Header */}
      {isConsole && (
        <Header
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenDrawer={() => setDrawerOpen(true)}
          leadsCount={leads.length}
        />
      )}

      {/* Sidebar Drawer */}
      <SidebarDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        leadsCount={leads.length}
      />

      {/* Main Content View Container */}
      <div className={`flex-1 flex flex-col ${isConsole ? 'pt-16 pb-16 px-4 sm:px-6' : ''}`}>
        {currentScreen === 'landing' && (
          <LandingPage
            onNavigate={(screen) => setCurrentScreen(screen)}
            onAddLead={handleAddLead}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'login' && (
          <AdminLogin
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLoginSuccess={() => showToast('Authenticated as Elena Vance', 'verified')}
          />
        )}

        {currentScreen === 'overview' && (
          <DashboardOverview
            onNavigate={(screen) => setCurrentScreen(screen)}
            leads={leads}
            onSelectLead={(lead) => {
              setActiveDrawerLead(lead);
            }}
            onSelectConversation={(id) => {
              setSelectedConvId(id);
            }}
          />
        )}

        {currentScreen === 'leads' && (
          <LeadsView
            leads={leads}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onDeleteLead={handleDeleteLead}
            onAddNote={handleAddNote}
            onShowToast={showToast}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectConversation={(id) => setSelectedConvId(id)}
            activeDrawerLead={activeDrawerLead}
            onOpenDrawer={(lead) => setActiveDrawerLead(lead)}
            onCloseDrawer={() => setActiveDrawerLead(null)}
          />
        )}

        {currentScreen === 'agents' && (
          <AgentsView
            agents={agents}
            onUpdateAgent={handleUpdateAgent}
            onAddAgent={handleAddAgent}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'chats' && (
          <ConversationsView
            conversations={conversations}
            selectedConvId={selectedConvId}
            onSelectConversation={(id) => setSelectedConvId(id)}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectLeadForDrawer={handleSelectLeadForDrawer}
            leads={leads}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'knowledge' && (
          <KnowledgeBaseView
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
            onShowToast={showToast}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsView
            onShowToast={showToast}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}
      </div>

      {/* Console Bottom Navigation */}
      {isConsole && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Floating Micro-interaction Toast */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        visible={toast.visible}
      />
    </div>
  );
}
