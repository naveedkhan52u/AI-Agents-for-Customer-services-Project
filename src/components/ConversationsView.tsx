import React, { useState } from 'react';
import { ConversationSession, ScreenType, Lead } from '../types';

interface ConversationsViewProps {
  conversations: ConversationSession[];
  selectedConvId?: string;
  onSelectConversation: (id: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectLeadForDrawer?: (lead: Lead) => void;
  leads: Lead[];
  onShowToast: (msg: string, icon?: string) => void;
}

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  conversations,
  selectedConvId = 'conv-1',
  onSelectConversation,
  onNavigate,
  onSelectLeadForDrawer,
  leads,
  onShowToast,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'leads' | 'resolved' | 'escalation'>('all');
  const [activeTab, setActiveTab] = useState<'list' | 'transcript'>('transcript');
  const [isLiveTakeover, setIsLiveTakeover] = useState(false);
  const [humanReplyInput, setHumanReplyInput] = useState('');

  const activeConv =
    conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const [activeMessages, setActiveMessages] = useState(activeConv.messages);

  const handleSendHumanReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!humanReplyInput.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'human' as const,
      name: 'Elena Vance (Live Agent)',
      time: 'Just now',
      text: humanReplyInput.trim(),
      tag: 'Live Operator Override',
    };

    setActiveMessages((prev) => [...prev, newMsg]);
    setHumanReplyInput('');
    onShowToast('Direct human response sent to visitor', 'send');
  };

  const handleToggleTakeover = () => {
    setIsLiveTakeover(!isLiveTakeover);
    if (!isLiveTakeover) {
      onShowToast(`You have taken live control of ${activeConv.visitorName}'s session`, 'support_agent');
    } else {
      onShowToast(`Handed control back to ${activeConv.agentName}`, 'smart_toy');
    }
  };

  const handleExportTranscript = () => {
    onShowToast(`Transcript ${activeConv.convNumber} exported as JSON & PDF`, 'download');
  };

  const handleFlagSession = () => {
    onShowToast(`Conversation ${activeConv.convNumber} flagged for QA lead audit`, 'flag');
  };

  const handleViewLeadRecord = () => {
    const matched = leads.find((l) => l.email === activeConv.leadEmail || l.name === activeConv.visitorName);
    if (matched && onSelectLeadForDrawer) {
      onSelectLeadForDrawer(matched);
    }
    onNavigate('leads');
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-4 max-w-2xl mx-auto">
      {/* Header & Context */}
      <div className="flex flex-col space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">
            Conversations
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dce9ff] text-[#3525cd] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#006d62] animate-pulse"></span>
            14 Live Now
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#464555]">
          Inspect live and historical AI agent dialogues and lead attribution.
        </p>
      </div>

      {/* Filter Pills (Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        <button
          onClick={() => setFilterType('all')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xs cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#4f46e5] text-white font-bold'
              : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff] font-semibold'
          }`}
          type="button"
        >
          All (4,120)
        </button>
        <button
          onClick={() => setFilterType('leads')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xs cursor-pointer ${
            filterType === 'leads'
              ? 'bg-[#4f46e5] text-white font-bold'
              : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff] font-semibold'
          }`}
          type="button"
        >
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#006d62]">check_circle</span>
            <span>With Lead (628)</span>
          </span>
        </button>
        <button
          onClick={() => setFilterType('resolved')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xs cursor-pointer ${
            filterType === 'resolved'
              ? 'bg-[#4f46e5] text-white font-bold'
              : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff] font-semibold'
          }`}
          type="button"
        >
          Resolved (3,240)
        </button>
        <button
          onClick={() => setFilterType('escalation')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xs cursor-pointer ${
            filterType === 'escalation'
              ? 'bg-[#4f46e5] text-white font-bold'
              : 'bg-[#eff4ff] text-[#ba1a1a] hover:bg-[#ffdad6] font-semibold'
          }`}
          type="button"
        >
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            <span>Needs Escalation (252)</span>
          </span>
        </button>
      </div>

      {/* Mobile Segmented View Switcher */}
      <div className="bg-[#eff4ff] p-1 rounded-xl flex items-center gap-1 shadow-xs border border-[#dce9ff]">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'list'
              ? 'bg-white text-[#0b1c30] shadow-xs'
              : 'text-[#565e74] hover:text-[#0b1c30]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">forum</span>
          <span>Conversation List</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#dce9ff] text-[#464555] text-[10px]">
            {conversations.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('transcript')}
          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'transcript'
              ? 'bg-white text-[#0b1c30] shadow-xs'
              : 'text-[#565e74] hover:text-[#0b1c30]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-[#4f46e5]">chat_bubble</span>
          <span>Active Transcript</span>
          <span className="w-2 h-2 rounded-full bg-[#006d62] animate-pulse"></span>
        </button>
      </div>

      {/* VIEW 1: Conversation List */}
      {activeTab === 'list' && (
        <div className="flex flex-col space-y-2.5 animate-in fade-in duration-200">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConv.id;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id);
                  setActiveMessages(conv.messages);
                  setActiveTab('transcript');
                }}
                className={`p-4 rounded-xl bg-white shadow-xs border transition-all cursor-pointer flex flex-col space-y-2 ${
                  isSelected
                    ? 'border-l-4 border-l-[#4f46e5] border-[#dce9ff]'
                    : 'border-[#e5eeff] hover:border-[#dce9ff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-xs">
                      {conv.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0b1c30]">{conv.visitorName}</div>
                      <div className="text-[11px] text-[#565e74]">
                        {conv.convNumber} • {conv.browser}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      conv.status === 'lead_captured'
                        ? 'bg-[#71f8e4] text-[#00201c]'
                        : conv.status === 'resolved'
                        ? 'bg-[#eff4ff] text-[#565e74]'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}
                  >
                    {conv.status === 'lead_captured'
                      ? 'Lead Captured'
                      : conv.status === 'resolved'
                      ? 'Resolved'
                      : 'Escalation Req.'}
                  </span>
                </div>
                <p className="text-xs text-[#464555] line-clamp-1 italic">
                  "{conv.snippet}"
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#565e74]">
                  <span>{conv.agentName}</span>
                  <span>{conv.timeAgo}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Active Conversation Transcript View */}
      {activeTab === 'transcript' && (
        <div className="flex flex-col space-y-3.5 animate-in fade-in duration-200">
          {/* Customer & Session Metadata Card */}
          <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e5eeff] space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-sm shadow-xs">
                    {activeConv.initials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#006d62] ring-2 ring-white"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base text-[#0b1c30] font-bold truncate">
                      {activeConv.visitorName}
                    </span>
                    <span className="px-2 py-0.25 rounded-md bg-[#eff4ff] text-[#464555] text-[11px] font-mono border border-[#dce9ff]">
                      {activeConv.convNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#565e74] text-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span className="truncate">{activeConv.location}</span>
                    <span>•</span>
                    <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                    <span className="truncate">{activeConv.browser}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#eff4ff] text-[#565e74] hover:text-[#0b1c30]"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            {/* Agent Attribution Row */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">smart_toy</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#565e74]">Handled By</span>
                  <span className="text-xs font-bold text-[#0b1c30]">{activeConv.agentName}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#006d62] text-[10px] font-bold shadow-2xs border border-[#dce9ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006d62]"></span>
                Active Model
              </span>
            </div>
          </div>

          {/* Lead Captured Alert Bar */}
          {activeConv.hasLead && (
            <div className="p-3.5 rounded-xl bg-[#00534a] text-white shadow-xs flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#71f8e4] shrink-0 mt-0.5">
                verified
              </span>
              <div className="flex-1 flex flex-col space-y-1">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Lead Captured Successfully</span>
                </div>
                <p className="text-xs text-white/90">
                  {activeConv.visitorName} (
                  <span className="font-semibold underline decoration-[#4fdbc8]">
                    {activeConv.leadEmail}
                  </span>
                  )
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleViewLeadRecord}
                    className="inline-flex items-center gap-1 text-xs text-[#71f8e4] font-bold hover:underline cursor-pointer"
                  >
                    <span>View Lead Record</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Message Transcript Container */}
          <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e5eeff] flex flex-col space-y-4">
            <div className="flex items-center justify-center my-1">
              <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[11px] text-[#565e74] border border-[#dce9ff]">
                Today • Lead Qualified Session
              </span>
            </div>

            {activeMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1 ${
                  msg.sender === 'user' ? 'items-start max-w-[88%]' : 'items-end self-end max-w-[88%]'
                }`}
              >
                <div className="flex items-center gap-1.5 px-1">
                  <span
                    className={`text-[11px] font-semibold ${
                      msg.sender === 'user'
                        ? 'text-[#565e74]'
                        : msg.sender === 'human'
                        ? 'text-[#00534a]'
                        : 'text-[#4f46e5]'
                    }`}
                  >
                    {msg.name}
                  </span>
                  <span className="text-[10px] text-[#777587]">{msg.time}</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#dce9ff] rounded-tl-sm text-[#0b1c30]'
                      : msg.sender === 'human'
                      ? 'bg-[#006d62] text-white rounded-tr-sm'
                      : 'bg-[#4f46e5] text-white rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.matchedKb && (
                  <div className="flex items-center gap-1 text-[10px] text-[#006d62] font-semibold px-1">
                    <span className="material-symbols-outlined text-[13px]">bolt</span>
                    <span>Knowledge Base matched: {msg.matchedKb}</span>
                  </div>
                )}

                {msg.tag && (
                  <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#464555] text-[10px] font-semibold mr-1 border border-[#dce9ff]">
                    {msg.tag}
                  </span>
                )}

                {msg.deliveredToCrm && (
                  <span className="text-[10px] text-[#565e74] px-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#006d62]">
                      done_all
                    </span>
                    <span>Delivered &amp; Pushed to CRM</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Live Agent Takeover Notification Banner */}
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#565e74] text-[20px]">
                {isLiveTakeover ? 'support_agent' : 'headset_mic'}
              </span>
              <span className="text-xs text-[#0b1c30] font-semibold">
                {isLiveTakeover
                  ? 'Human Operator is in active control of this chat.'
                  : 'Bot automation is currently in control.'}
              </span>
            </div>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isLiveTakeover ? 'bg-[#3525cd] animate-ping' : 'bg-[#006d62] animate-pulse'
              }`}
            ></span>
          </div>

          {/* Interactive Live Human Response Input if Takeover Active */}
          {isLiveTakeover && (
            <form onSubmit={handleSendHumanReply} className="flex gap-2">
              <input
                type="text"
                placeholder="Type response as Elena Vance (Live Operator)..."
                value={humanReplyInput}
                onChange={(e) => setHumanReplyInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-white rounded-lg text-xs text-[#0b1c30] border border-[#3525cd] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#006d62] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#00534a]"
              >
                Send
              </button>
            </form>
          )}

          {/* Action Bar at bottom */}
          <div className="pt-1 flex flex-col space-y-2">
            {/* Main CTA Takeover Button */}
            <button
              onClick={handleToggleTakeover}
              className={`w-full h-12 flex items-center justify-center gap-2 rounded-lg font-bold text-xs sm:text-sm shadow-xs active:scale-[0.99] transition-all cursor-pointer ${
                isLiveTakeover
                  ? 'bg-[#006d62] text-white hover:bg-[#00534a]'
                  : 'bg-[#0b1c30] text-white hover:bg-[#213145]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isLiveTakeover ? 'stop_circle' : 'support_agent'}
              </span>
              <span>
                {isLiveTakeover ? 'Release to AI Agent' : 'Take Over Chat (Live Agent)'}
              </span>
            </button>

            {/* Secondary Split Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExportTranscript}
                className="h-11 flex items-center justify-center gap-1.5 rounded-lg bg-white border border-[#e5eeff] text-[#0b1c30] text-xs font-bold shadow-2xs hover:bg-[#eff4ff] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#565e74]">ios_share</span>
                <span>Export Transcript</span>
              </button>
              <button
                onClick={handleFlagSession}
                className="h-11 flex items-center justify-center gap-1.5 rounded-lg bg-white border border-[#e5eeff] text-[#0b1c30] text-xs font-bold shadow-2xs hover:bg-[#eff4ff] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">flag</span>
                <span>Flag Conversation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
