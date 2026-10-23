import React, { useState } from 'react';
import { Lead, LeadStatus, ScreenType } from '../types';

interface LeadsViewProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  onDeleteLead: (id: string) => void;
  onAddNote: (leadId: string, noteText: string) => void;
  onShowToast: (message: string, icon?: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectConversation?: (convId: string) => void;
  activeDrawerLead?: Lead | null;
  onOpenDrawer?: (lead: Lead) => void;
  onCloseDrawer?: () => void;
}

export const LeadsView: React.FC<LeadsViewProps> = ({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  onAddNote,
  onShowToast,
  onNavigate,
  onSelectConversation,
  activeDrawerLead,
  onOpenDrawer,
  onCloseDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusTargetLead, setStatusTargetLead] = useState<Lead | null>(null);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Count calculations
  const totalCount = leads.length >= 5 ? leads.length + 623 : 628;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const qualifiedCount = leads.filter((l) => l.status === 'qualified').length;

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.requirement.toLowerCase().includes(q);

    const matchesStatus =
      selectedStatus === 'all' || lead.status === selectedStatus;

    let matchesAgent = true;
    if (selectedAgent === 'sales') matchesAgent = lead.agent.toLowerCase().includes('sales');
    else if (selectedAgent === 'home') matchesAgent = lead.agent.toLowerCase().includes('home');
    else if (selectedAgent === 'pricing') matchesAgent = lead.agent.toLowerCase().includes('pricing');

    return matchesSearch && matchesStatus && matchesAgent;
  });

  const handleExportCsv = () => {
    onShowToast(`Exporting ${totalCount} records to Orken_Leads_Export.csv...`, 'download');
    setTimeout(() => {
      // Build a simple CSV download
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        ['Name,Email,Company,Phone,Agent,Status,Score,Requirement']
          .concat(
            leads.map(
              (l) =>
                `"${l.name}","${l.email}","${l.company}","${l.phone}","${l.agent}","${l.status}","${l.score || 90}","${l.requirement.replace(/"/g, '""')}"`
            )
          )
          .join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `orken_leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onShowToast('CSV downloaded successfully!', 'verified');
    }, 800);
  };

  const handleSaveNote = () => {
    if (!activeDrawerLead || !newNoteInput.trim()) return;
    onAddNote(activeDrawerLead.id, newNoteInput.trim());
    setNewNoteInput('');
    onShowToast('Note attached to lead activity log', 'post_add');
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4 max-w-2xl mx-auto">
      {/* Page Header & Action */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#3525cd] font-bold">
              Orken Intelligence Suite
            </span>
            <h1 className="text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">
              Lead Generation
            </h1>
          </div>
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3525cd] hover:bg-[#4f46e5] text-white shadow-xs active:scale-95 transition-all text-xs font-bold cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-[#464555] leading-relaxed">
          View, organize, and manage high-intent customer leads captured automatically by your active conversational AI agents.
        </p>
      </div>

      {/* Summary Metric Cards (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Leads */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#565e74]">Total Leads</span>
            <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#0b1c30] font-bold">{totalCount}</div>
            <span className="text-[11px] text-[#565e74]">All time pipeline</span>
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#565e74]">New Leads</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#e2dfff] text-[#3323cc] font-bold">
              Review
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#3525cd] font-bold">{newCount > 0 ? newCount : 84}</div>
            <span className="text-[11px] text-[#565e74]">Requires triage</span>
          </div>
        </div>

        {/* Contacted Leads */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#565e74]">Contacted</span>
            <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#565e74]">
              <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#0b1c30] font-bold">{contactedCount > 0 ? contactedCount + 240 : 242}</div>
            <span className="text-[11px] text-[#565e74]">In active outreach</span>
          </div>
        </div>

        {/* Qualified Leads */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#565e74]">Qualified</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#71f8e4] text-[#00201c] font-bold">
              +18%
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#006d62] font-bold">{qualifiedCount > 0 ? qualifiedCount + 300 : 302}</div>
            <span className="text-[11px] text-[#565e74]">High purchase intent</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col space-y-2.5">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74] text-[20px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-[#0b1c30] text-xs sm:text-sm shadow-xs border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            placeholder="Search customer, company, or email..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters Carousel & Source Pill */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'new', label: `New (${newCount || 84})` },
            { id: 'contacted', label: 'Contacted' },
            { id: 'qualified', label: 'Qualified' },
            { id: 'converted', label: 'Converted' },
            { id: 'unqualified', label: 'Unqualified' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedStatus(pill.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                selectedStatus === pill.id
                  ? 'bg-[#4f46e5] text-white'
                  : 'bg-white text-[#464555] border border-[#e5eeff] hover:bg-[#eff4ff]'
              }`}
              type="button"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Agent Source Selector Row */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-[#464555]">
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            <span className="text-xs font-semibold">Agent Source:</span>
          </div>
          <div className="relative inline-block">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="appearance-none bg-white border border-[#e5eeff] pl-3 pr-8 py-1.5 rounded-lg text-xs text-[#0b1c30] font-bold shadow-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All AI Agents (3 Active)</option>
              <option value="sales">Sales Agent v2</option>
              <option value="home">Homepage Chatbot</option>
              <option value="pricing">Pricing Assistant</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#565e74] pointer-events-none text-[16px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Leads List Stream */}
      <div className="flex flex-col space-y-3">
        {filteredLeads.map((lead) => {
          const isSelected = selectedLeadIds.includes(lead.id);
          return (
            <div
              key={lead.id}
              className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] transition-all flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-2.5">
                  <input
                    aria-label={`Select lead ${lead.name}`}
                    className="mt-1 rounded text-[#3525cd] focus:ring-[#3525cd] w-4 h-4 cursor-pointer accent-[#3525cd]"
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectLead(lead.id)}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base text-[#0b1c30] font-bold">
                        {lead.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          lead.status === 'qualified'
                            ? 'bg-[#71f8e4] text-[#00201c]'
                            : lead.status === 'new'
                            ? 'bg-[#e2dfff] text-[#3323cc]'
                            : lead.status === 'contacted'
                            ? 'bg-[#dae2fd] text-[#131b2e]'
                            : lead.status === 'converted'
                            ? 'bg-[#006d62] text-white'
                            : 'bg-[#ffdad6] text-[#93000a]'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#565e74] text-[11px] mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">domain</span>
                      <span>{lead.company}</span>
                      <span>•</span>
                      <span>{lead.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#006d62] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>

              {/* Contact details */}
              <div className="bg-[#eff4ff] p-2.5 rounded-lg flex flex-col gap-1.5 my-2 border border-[#dce9ff]">
                <div className="flex items-center justify-between text-[#464555] text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[16px] text-[#565e74]">mail</span>
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <a
                    className="text-[#3525cd] font-semibold hover:underline text-[11px] shrink-0"
                    href={`mailto:${lead.email}`}
                  >
                    Email
                  </a>
                </div>
                <div className="flex items-center justify-between text-[#464555] text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#565e74]">call</span>
                    <span>{lead.phone}</span>
                  </div>
                  <a
                    className="text-[#3525cd] font-semibold hover:underline text-[11px] shrink-0"
                    href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* Requirements & Meta */}
              <div className="space-y-1.5 mb-3">
                <div className="text-[#464555] text-xs bg-[#f8f9ff] p-2 rounded border border-[#e5eeff] leading-relaxed">
                  <span className="font-semibold text-[#0b1c30]">Requirement: </span>
                  "{lead.requirement}"
                </div>
                <div className="flex items-center justify-between text-[#565e74] text-[11px] px-1">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#3525cd]">smart_toy</span>
                    <span>{lead.agent}</span>
                  </div>
                  <span className="text-[#00534a] font-semibold">{lead.consent}</span>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] -mx-4 -mb-4 px-4 py-2.5 bg-[#f8f9ff] rounded-b-xl">
                <button
                  onClick={() => onOpenDrawer ? onOpenDrawer(lead) : null}
                  className="inline-flex items-center gap-1 text-[#3525cd] text-xs font-bold active:scale-95 transition-all cursor-pointer hover:underline"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>View Details</span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setStatusTargetLead(lead);
                      setStatusDialogOpen(true);
                    }}
                    className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#0b1c30] text-[11px] font-bold hover:bg-[#dce9ff] transition-colors cursor-pointer border border-[#dce9ff]"
                    type="button"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => {
                      onDeleteLead(lead.id);
                      onShowToast(`Lead "${lead.name}" archived and removed`, 'delete');
                    }}
                    className="p-1 rounded text-[#565e74] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                    title="Delete lead"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Drawer / Bottom Sheet Modal */}
      {activeDrawerLead && (
        <div className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-xs z-50 flex flex-col justify-end">
          <div className="w-full max-w-xl mx-auto bg-white rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Drawer Handle & Header */}
            <div className="pt-3 pb-2 px-4 sm:px-6 flex flex-col border-b border-[#eff4ff] bg-[#eff4ff]/40 rounded-t-2xl">
              <div className="w-12 h-1.5 bg-[#dce9ff] rounded-full mx-auto mb-3"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center font-bold text-[#3323cc] text-sm">
                    {activeDrawerLead.initials}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#0b1c30]">{activeDrawerLead.name}</h2>
                    <span className="text-xs text-[#565e74]">{activeDrawerLead.company}</span>
                  </div>
                </div>
                <button
                  onClick={onCloseDrawer}
                  className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#565e74] hover:text-[#0b1c30] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Drawer Content (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* Status Banner */}
              <div className="flex items-center justify-between bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#3525cd]">smart_toy</span>
                  <span className="text-xs font-semibold text-[#0b1c30]">{activeDrawerLead.agent}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#71f8e4] text-[#00201c] font-bold capitalize">
                  {activeDrawerLead.status}
                </span>
              </div>

              {/* Requirement Summary */}
              <div className="space-y-1">
                <span className="text-[11px] text-[#565e74] uppercase font-bold tracking-wider">
                  AI Extracted Intent
                </span>
                <div className="p-3 bg-[#eff4ff] rounded-lg text-[#0b1c30] text-xs sm:text-sm border border-[#dce9ff]">
                  "{activeDrawerLead.requirement}"
                </div>
              </div>

              {/* Chat Transcript Linkage Card */}
              <div className="bg-[#eff4ff] p-3.5 rounded-xl space-y-2 border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#3525cd]">forum</span>
                    <span className="text-xs font-bold text-[#0b1c30]">Agent Conversation Log</span>
                  </div>
                  <span className="text-[#00534a] text-xs font-semibold">4m 12s duration</span>
                </div>
                <div className="bg-white p-3 rounded-lg space-y-1.5 text-xs text-[#464555] border border-[#e5eeff]">
                  <p><strong className="text-[#3525cd]">AI:</strong> "Hello! What systems are you looking to integrate with Orken?"</p>
                  <p><strong className="text-[#0b1c30]">User:</strong> "We use Salesforce and need around 5,000 queries automated per month."</p>
                </div>
                <button
                  onClick={() => {
                    if (onSelectConversation) onSelectConversation('conv-1');
                    if (onCloseDrawer) onCloseDrawer();
                    onNavigate('chats');
                  }}
                  className="w-full py-1.5 text-center text-[#3525cd] text-xs font-bold hover:underline flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span>Open Full Interactive Transcript</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2">
                <span className="text-[11px] text-[#565e74] uppercase font-bold tracking-wider">
                  Activity History
                </span>
                <div className="space-y-3 pl-2 border-l-2 border-[#dce9ff] ml-1">
                  <div className="relative pl-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3525cd] absolute -left-[17px] top-1"></div>
                    <div className="text-xs font-bold text-[#0b1c30]">Lead Captured via Widget</div>
                    <div className="text-[11px] text-[#464555]">Qualified with confidence score 96%</div>
                    <div className="text-[10px] text-[#565e74] mt-0.5">{activeDrawerLead.timestamp}</div>
                  </div>
                  <div className="relative pl-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006d62] absolute -left-[17px] top-1"></div>
                    <div className="text-xs font-bold text-[#0b1c30]">Webhook Notification Sent</div>
                    <div className="text-[11px] text-[#464555]">Dispatched to Slack #sales-urgent channel</div>
                    <div className="text-[10px] text-[#565e74] mt-0.5">1 min after capture</div>
                  </div>
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="space-y-2">
                <label className="text-[11px] text-[#565e74] uppercase font-bold tracking-wider block">
                  Internal Team Notes
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] text-xs focus:outline-none focus:ring-1 focus:ring-[#3525cd] border border-[#dce9ff]"
                    placeholder="Add follow-up notes or assignee..."
                    type="text"
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
                  />
                  <button
                    onClick={handleSaveNote}
                    className="px-3.5 py-2 bg-[#3525cd] text-white rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer"
                    type="button"
                  >
                    Save
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {(activeDrawerLead.notes || []).map((note) => (
                    <div
                      key={note.id}
                      className="p-2.5 bg-[#eff4ff]/60 border border-[#dce9ff] rounded text-xs text-[#0b1c30] flex justify-between items-center"
                    >
                      <span>{note.text}</span>
                      <span className="text-[10px] text-[#565e74] shrink-0 ml-2">{note.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 bg-[#eff4ff]/80 border-t border-[#e5eeff] flex items-center gap-3">
              <a
                href={`tel:${activeDrawerLead.phone.replace(/[^0-9]/g, '')}`}
                className="flex-1 py-2.5 px-3 rounded-lg bg-white border border-[#dce9ff] text-[#0b1c30] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px] text-[#3525cd]">call</span>
                <span>Direct Call</span>
              </a>
              <button
                onClick={() => {
                  onUpdateLeadStatus(activeDrawerLead.id, 'converted');
                  onShowToast('Lead marked as Processed & Converted!', 'verified');
                  if (onCloseDrawer) onCloseDrawer();
                }}
                className="flex-1 py-2.5 px-3 rounded-lg bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Mark Handled</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Popover Dialog */}
      {statusDialogOpen && statusTargetLead && (
        <div className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-[#dce9ff] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-[#0b1c30] font-bold">Update Lead Status</h3>
              <button
                onClick={() => setStatusDialogOpen(false)}
                className="text-[#565e74] hover:text-[#0b1c30] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#464555]">
              Choose a new stage to transition {statusTargetLead.name}'s opportunity.
            </p>
            <div className="space-y-1.5 pt-1">
              {[
                { status: 'new' as LeadStatus, label: 'New Lead', icon: 'fiber_new', color: 'text-[#3525cd]' },
                { status: 'contacted' as LeadStatus, label: 'Contacted', icon: 'outgoing_mail', color: 'text-[#565e74]' },
                { status: 'qualified' as LeadStatus, label: 'Qualified', icon: 'check_circle', color: 'text-[#006d62]' },
                { status: 'converted' as LeadStatus, label: 'Converted', icon: 'monetization_on', color: 'text-[#006d62]' },
                { status: 'unqualified' as LeadStatus, label: 'Unqualified', icon: 'cancel', color: 'text-[#ba1a1a]' },
              ].map((opt) => (
                <button
                  key={opt.status}
                  onClick={() => {
                    onUpdateLeadStatus(statusTargetLead.id, opt.status);
                    onShowToast(`Lead updated to: ${opt.label}`, 'check');
                    setStatusDialogOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-xs font-bold text-[#0b1c30] flex items-center justify-between transition-colors cursor-pointer"
                  type="button"
                >
                  <span>{opt.label}</span>
                  <span className={`material-symbols-outlined text-[18px] ${opt.color}`}>
                    {opt.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
