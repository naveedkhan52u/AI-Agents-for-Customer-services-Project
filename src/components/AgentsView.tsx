import React, { useState } from 'react';
import { AgentConfig } from '../types';

interface AgentsViewProps {
  agents: AgentConfig[];
  onUpdateAgent: (updated: AgentConfig) => void;
  onAddAgent: (agent: AgentConfig) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const AgentsView: React.FC<AgentsViewProps> = ({
  agents,
  onUpdateAgent,
  onAddAgent,
  onShowToast,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'ag_892b1');
  const [showNewAgentModal, setShowNewAgentModal] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentUrl, setNewAgentUrl] = useState('');

  // Active selected agent configuration in edit state
  const currentAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];
  const [editConfig, setEditConfig] = useState<AgentConfig>(currentAgent);

  // Sync editConfig when agent selection switches
  const handleSelectAgent = (agent: AgentConfig) => {
    setSelectedAgentId(agent.id);
    setEditConfig(agent);
  };

  // Live Simulator state
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'bot' | 'visitor'; text: string; isLeadForm?: boolean }>>([
    { sender: 'bot', text: currentAgent.greetingMessage },
    { sender: 'visitor', text: 'Hi! Could you share enterprise pricing plans?' },
    {
      sender: 'bot',
      text: "I'd love to help! Our team provides tailored volume licensing. What work email should we send the PDF breakdown to?",
      isLeadForm: true,
    },
  ]);
  const [simInput, setSimInput] = useState('');

  const handleSimSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;

    const userText = simInput.trim();
    setSimMessages((prev) => [...prev, { sender: 'visitor', text: userText }]);
    setSimInput('');

    setTimeout(() => {
      let reply = `Thank you! As a ${editConfig.persona === 'technical' ? 'technical specialist' : 'solutions advisor'}, I'm ready to assist.`;
      if (userText.includes('@')) {
        reply = "Captured your email! I've scheduled our enterprise team to follow up with custom specifications.";
      }
      setSimMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(editConfig.embedSnippet);
    onShowToast('Embed snippet copied to clipboard!', 'content_copy');
  };

  const handlePublish = () => {
    onUpdateAgent(editConfig);
    onShowToast(`Agent "${editConfig.name}" published to production CDN!`, 'cloud_done');
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const newAg: AgentConfig = {
      id: `ag_${Math.random().toString(36).substring(2, 7)}`,
      name: newAgentName.trim(),
      url: newAgentUrl.trim() || 'https://orken.ai',
      status: 'active',
      chatsCount: 0,
      leadsCount: 0,
      convRate: '0.0%',
      persona: 'professional',
      greetingMessage: `Hello! I'm ${newAgentName}. How may I help you today?`,
      accentColor: '#4F46E5',
      widgetPosition: 'bottom-right',
      requiredFields: { name: true, email: true, phone: true, company: true },
      triggerCondition: 'Immediate greeting upon user interaction.',
      knowledgeSources: [],
      embedSnippet: `<script src="https://cdn.orken.ai/widget.js" data-agent-id="ag_${Math.random().toString(36).substring(2, 7)}" async></script>`
    };

    onAddAgent(newAg);
    setShowNewAgentModal(false);
    setNewAgentName('');
    setNewAgentUrl('');
    handleSelectAgent(newAg);
    onShowToast(`New agent "${newAg.name}" created!`, 'add_task');
  };

  const toggleRequiredField = (field: keyof AgentConfig['requiredFields']) => {
    setEditConfig((prev) => ({
      ...prev,
      requiredFields: {
        ...prev.requiredFields,
        [field]: !prev.requiredFields[field],
      },
    }));
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-2xl mx-auto pb-16">
      {/* Top Intro Section */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#4f46e5] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#565e74] font-bold">
                Workforce Engine
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">
              AI Agents
            </h1>
          </div>
          <button
            onClick={() => setShowNewAgentModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Agent</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-[#565e74]">
          Deploy, configure, and monitor automated conversational agents in real-time.
        </p>
      </div>

      {/* Operational Health Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#565e74]">Active / Total</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4fdbc8] animate-pulse"></span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#0b1c30]">
              {agents.filter((a) => a.status === 'active').length}
            </span>
            <span className="text-xs text-[#565e74]">/ {agents.length} total</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#00534a] font-bold">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>83% operational</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#565e74]">Avg Latency</span>
            <span className="material-symbols-outlined text-[#4f46e5] text-[18px]">speed</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#0b1c30]">0.8</span>
            <span className="text-xs text-[#565e74]">sec</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#00534a] font-bold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+14.2% faster</span>
          </div>
        </div>
      </div>

      {/* Deployed Agents List */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0b1c30]">Deployed Agents</span>
          <span className="text-[11px] text-[#565e74]">Select to configure</span>
        </div>

        {agents.map((agent) => {
          const isSelected = agent.id === selectedAgentId;
          return (
            <div
              key={agent.id}
              onClick={() => handleSelectAgent(agent)}
              className={`bg-white rounded-xl p-4 transition-all flex flex-col gap-2 cursor-pointer border ${
                isSelected
                  ? 'border-[#4f46e5] shadow-md ring-2 ring-[#4f46e5]/20'
                  : 'border-[#e5eeff] shadow-xs hover:border-[#dce9ff]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#4f46e5]">
                    <span className="material-symbols-outlined text-[22px]">
                      {agent.persona === 'technical' ? 'terminal' : 'contact_support'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#0b1c30]">{agent.name}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === 'active' ? 'bg-[#4fdbc8]' : 'bg-[#c7c4d8]'
                        }`}
                      ></span>
                    </div>
                    <span className="text-[11px] text-[#565e74] truncate">{agent.url}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      agent.status === 'active'
                        ? 'bg-[#71f8e4] text-[#00201c]'
                        : 'bg-[#e5eeff] text-[#565e74]'
                    }`}
                  >
                    {agent.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                  {/* Quick Toggle Status */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated: AgentConfig = {
                        ...agent,
                        status: agent.status === 'active' ? 'paused' : 'active',
                      };
                      onUpdateAgent(updated);
                      if (agent.id === selectedAgentId) {
                        setEditConfig(updated);
                      }
                      onShowToast(
                        `Agent "${agent.name}" is now ${updated.status}`,
                        updated.status === 'active' ? 'play_arrow' : 'pause'
                      );
                    }}
                    className="p-1 text-[#565e74] hover:text-[#0b1c30]"
                    title="Toggle Agent"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {agent.status === 'active' ? 'pause_circle' : 'play_circle'}
                    </span>
                  </button>
                </div>
              </div>

              {isSelected && (
                <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] p-2.5 rounded-lg mt-1 border border-[#dce9ff]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#565e74]">Chats</span>
                    <span className="text-xs font-bold text-[#0b1c30]">{agent.chatsCount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#565e74]">Leads</span>
                    <span className="text-xs font-bold text-[#0b1c30]">{agent.leadsCount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#565e74]">Conv.</span>
                    <span className="text-xs font-bold text-[#006d62]">{agent.convRate}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agent Configuration Interface */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
            <h2 className="text-base text-[#0b1c30] font-bold">
              Configure: {editConfig.name}
            </h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#eff4ff] text-[#565e74] font-mono border border-[#dce9ff]">
            ID: {editConfig.id}
          </span>
        </div>

        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#0b1c30]">
            <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">badge</span>
            <span className="text-xs sm:text-sm font-bold">1. Basic Information</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#565e74]">Agent Name</label>
              <input
                className="w-full bg-[#eff4ff] text-[#0b1c30] text-xs sm:text-sm px-3 py-2 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#4f46e5] border border-[#dce9ff]"
                type="text"
                value={editConfig.name}
                onChange={(e) => setEditConfig({ ...editConfig, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#565e74]">Brand Persona</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditConfig({ ...editConfig, persona: 'professional' })}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                    editConfig.persona === 'professional'
                      ? 'bg-[#4f46e5] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#464555] hover:bg-[#dce9ff]'
                  }`}
                >
                  Professional &amp; Welcoming
                </button>
                <button
                  type="button"
                  onClick={() => setEditConfig({ ...editConfig, persona: 'technical' })}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                    editConfig.persona === 'technical'
                      ? 'bg-[#4f46e5] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#464555] hover:bg-[#dce9ff]'
                  }`}
                >
                  Technical Specialist
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#565e74]">Target Website URL</label>
              <div className="flex items-center bg-[#eff4ff] rounded-lg px-3 py-2 border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[#565e74] text-[18px] mr-1.5">link</span>
                <input
                  className="w-full bg-transparent text-[#0b1c30] text-xs sm:text-sm outline-none"
                  type="text"
                  value={editConfig.url}
                  onChange={(e) => setEditConfig({ ...editConfig, url: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Greeting & Appearance */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#0b1c30]">
            <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">palette</span>
            <span className="text-xs sm:text-sm font-bold">2. Greeting &amp; Appearance</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#565e74]">Default Greeting Message</label>
              <textarea
                className="w-full bg-[#eff4ff] text-[#0b1c30] text-xs sm:text-sm p-3 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#4f46e5] border border-[#dce9ff] resize-none"
                rows={2}
                value={editConfig.greetingMessage}
                onChange={(e) => setEditConfig({ ...editConfig, greetingMessage: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#565e74]">Accent Color</label>
                <div className="flex items-center gap-2 bg-[#eff4ff] px-2.5 py-1.5 rounded-lg border border-[#dce9ff]">
                  <input
                    type="color"
                    value={editConfig.accentColor}
                    onChange={(e) => setEditConfig({ ...editConfig, accentColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono font-bold text-[#0b1c30]">
                    {editConfig.accentColor.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#565e74]">Widget Position</label>
                <select
                  value={editConfig.widgetPosition}
                  onChange={(e) =>
                    setEditConfig({
                      ...editConfig,
                      widgetPosition: e.target.value as 'bottom-right' | 'bottom-left',
                    })
                  }
                  className="bg-[#eff4ff] px-2.5 py-2 rounded-lg text-xs font-bold text-[#0b1c30] border border-[#dce9ff] outline-none"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Lead Capture Rules */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0b1c30]">
              <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">filter_alt</span>
              <span className="text-xs sm:text-sm font-bold">3. Lead Capture Rules</span>
            </div>
            <span className="text-[10px] text-[#006d62] font-bold bg-[#71f8e4]/40 px-2 py-0.5 rounded-full">
              Automated
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-[#565e74]">Required Prospect Fields</label>
            <div className="grid grid-cols-2 gap-2">
              {(['name', 'email', 'phone', 'company'] as const).map((field) => (
                <label
                  key={field}
                  onClick={() => toggleRequiredField(field)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] cursor-pointer border border-[#dce9ff]"
                >
                  <input
                    checked={editConfig.requiredFields[field]}
                    readOnly
                    className="w-4 h-4 rounded text-[#4f46e5] accent-[#4f46e5]"
                    type="checkbox"
                  />
                  <span className="text-xs text-[#0b1c30] font-medium capitalize">
                    {field === 'email' ? 'Work Email' : field === 'phone' ? 'Phone Number' : field}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-xs font-semibold text-[#565e74]">
                Qualification Trigger Condition
              </label>
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-start gap-2 border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[#4f46e5] text-[18px] mt-0.5">
                  psychology
                </span>
                <input
                  type="text"
                  value={editConfig.triggerCondition}
                  onChange={(e) =>
                    setEditConfig({ ...editConfig, triggerCondition: e.target.value })
                  }
                  className="bg-transparent text-xs text-[#0b1c30] w-full outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Approved Knowledge Sources */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0b1c30]">
              <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">menu_book</span>
              <span className="text-xs sm:text-sm font-bold">4. Knowledge Sources</span>
            </div>
            <label className="text-[#4f46e5] text-xs font-bold flex items-center gap-1 cursor-pointer hover:underline">
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Upload</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const newSource = {
                      id: `k_${Date.now()}`,
                      name: file.name,
                      size: `${(file.size / 1024).toFixed(0)} KB`,
                      updated: 'Just now • Synced',
                      type: file.name.endsWith('.pdf') ? ('pdf' as const) : ('docx' as const),
                    };
                    setEditConfig((prev) => ({
                      ...prev,
                      knowledgeSources: [...prev.knowledgeSources, newSource],
                    }));
                    onShowToast(`Uploaded "${file.name}" to agent training index`, 'check_circle');
                  }
                }}
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            {editConfig.knowledgeSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      source.type === 'pdf' ? 'text-[#ba1a1a]' : 'text-[#4f46e5]'
                    }`}
                  >
                    {source.type === 'pdf' ? 'picture_as_pdf' : 'description'}
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-[#0b1c30] truncate">
                      {source.name}
                    </span>
                    <span className="text-[10px] text-[#565e74]">{source.updated}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditConfig((prev) => ({
                      ...prev,
                      knowledgeSources: prev.knowledgeSources.filter((k) => k.id !== source.id),
                    }));
                    onShowToast(`Removed ${source.name}`, 'delete');
                  }}
                  className="material-symbols-outlined text-[#565e74] hover:text-[#ba1a1a] text-[18px] cursor-pointer"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Embed Code Snippet */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0b1c30]">
              <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">code</span>
              <span className="text-xs sm:text-sm font-bold">5. Embed Code Snippet</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#71f8e4]/40 text-[#00201c] font-bold">
              Ready
            </span>
          </div>
          <div className="bg-[#213145] rounded-xl p-3 text-[#eaf1ff] flex flex-col gap-2">
            <code className="font-mono text-[11px] leading-relaxed break-all select-all text-[#bec6e0]">
              {editConfig.embedSnippet}
            </code>
            <div className="flex justify-end pt-1">
              <button
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4f46e5] text-white text-xs font-bold active:scale-95 transition-transform cursor-pointer hover:bg-[#3525cd]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span>Copy Snippet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Interactive Bot Simulator Frame */}
      <div className="flex flex-col gap-2.5 my-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006d62] text-[20px]">
              smartphone
            </span>
            <span className="text-xs sm:text-sm text-[#0b1c30] font-bold">
              Live Mobile Widget Preview
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4fdbc8] animate-pulse"></span>
            <span className="text-[11px] text-[#565e74]">Real-time</span>
          </div>
        </div>

        {/* Simulator Shell */}
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-[#dce9ff]">
          {/* Simulated Chat Header */}
          <div
            className="p-3.5 text-white flex items-center justify-between"
            style={{ backgroundColor: editConfig.accentColor }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4fdbc8] ring-2 ring-white"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {editConfig.name}
                </span>
                <span className="text-[10px] text-white/80">Typically replies instantly</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={() =>
                  setSimMessages([
                    { sender: 'bot', text: editConfig.greetingMessage },
                  ])
                }
                className="p-1 rounded hover:bg-white/10"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
            </div>
          </div>

          {/* Simulated Message Body */}
          <div className="bg-[#eff4ff] p-4 flex flex-col gap-3 min-h-[220px] max-h-[340px] overflow-y-auto">
            {simMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.sender === 'visitor' ? 'self-end max-w-[85%]' : 'self-start max-w-[90%]'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: editConfig.accentColor }}
                  >
                    <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'visitor'
                      ? 'bg-[#4f46e5] text-white rounded-tr-sm'
                      : 'bg-white text-[#0b1c30] rounded-tl-sm border border-[#e5eeff]'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.isLeadForm && (
                    <div className="flex items-center gap-1.5 pt-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#eff4ff] text-[#4f46e5] text-[10px] font-bold border border-[#dce9ff]">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Lead capture form ready
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Simulated Footer Input */}
          <form onSubmit={handleSimSend} className="p-2.5 bg-white border-t border-[#eff4ff] flex items-center gap-2">
            <input
              type="text"
              placeholder="Reply to assistant..."
              value={simInput}
              onChange={(e) => setSimInput(e.target.value)}
              className="flex-1 bg-[#eff4ff] rounded-full px-4 py-2 text-xs text-[#0b1c30] placeholder:text-[#565e74] outline-none border border-[#dce9ff]"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-xs cursor-pointer"
              style={{ backgroundColor: editConfig.accentColor }}
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Sticky Save / Publish Bar */}
      <div className="sticky bottom-20 z-40 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-[#dce9ff] flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2 h-2 rounded-full bg-[#4fdbc8]"></span>
          <span className="text-xs text-[#0b1c30] font-bold">All changes saved locally</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditConfig(currentAgent);
              onShowToast('Reverted modifications to active agent', 'undo');
            }}
            className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
            type="button"
          >
            Discard
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-1.5 rounded-lg bg-[#4f46e5] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer hover:bg-[#3525cd]"
            type="button"
          >
            Publish
          </button>
        </div>
      </div>

      {/* New Agent Modal */}
      {showNewAgentModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#dce9ff] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30]">Deploy New AI Agent</h3>
              <button
                onClick={() => setShowNewAgentModal(false)}
                className="text-[#565e74] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateAgent} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#565e74] block mb-1">
                  Agent Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Booking Bot"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] border border-[#dce9ff] outline-none focus:ring-1 focus:ring-[#4f46e5]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565e74] block mb-1">
                  Target Website URL
                </label>
                <input
                  type="text"
                  placeholder="https://mysite.com/enterprise"
                  value={newAgentUrl}
                  onChange={(e) => setNewAgentUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] border border-[#dce9ff] outline-none focus:ring-1 focus:ring-[#4f46e5]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAgentModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-[#565e74]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4f46e5] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
