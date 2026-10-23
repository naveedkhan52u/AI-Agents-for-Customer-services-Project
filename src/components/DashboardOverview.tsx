import React, { useState } from 'react';
import { ScreenType, Lead } from '../types';

interface DashboardOverviewProps {
  onNavigate: (screen: ScreenType) => void;
  leads: Lead[];
  onSelectLead?: (lead: Lead) => void;
  onSelectConversation?: (convId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  leads,
  onSelectLead,
  onSelectConversation,
}) => {
  const [dateFilter, setDateFilter] = useState<'7d' | '30d' | '90d' | 'custom'>('7d');
  const [chartView, setChartView] = useState<'daily' | 'weekly'>('daily');

  // Dynamic values based on selected date filter
  const metrics = {
    '7d': { visitors: '24,850', vChange: '+14.2%', convs: '4,120', cChange: '+18.5%', leads: `${leads.length > 5 ? leads.length + 623 : 628}`, lChange: '+26.4%', rate: '15.2%', rChange: '+2.8%' },
    '30d': { visitors: '96,400', vChange: '+22.4%', convs: '16,840', cChange: '+19.1%', leads: '2,480', lChange: '+31.0%', rate: '14.7%', rChange: '+1.9%' },
    '90d': { visitors: '284,100', vChange: '+34.8%', convs: '48,900', cChange: '+28.4%', leads: '7,120', lChange: '+42.5%', rate: '14.5%', rChange: '+2.1%' },
    'custom': { visitors: '18,200', vChange: '+9.5%', convs: '3,100', cChange: '+12.0%', leads: '480', lChange: '+15.2%', rate: '15.5%', rChange: '+3.1%' },
  }[dateFilter];

  return (
    <div className="flex flex-col w-full space-y-4 max-w-2xl mx-auto pb-10">
      {/* Header / Top Area */}
      <section className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-xs sm:text-sm text-[#464555] mt-0.5">
              Monitor your AI agents, customer conversations, and lead generation.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-[#e5eeff] px-3 py-1 rounded-full border border-[#dce9ff]">
            <span className="w-2 h-2 rounded-full bg-[#4fdbc8] animate-pulse"></span>
            <span className="text-[11px] text-[#006d62] font-bold">Live Feed</span>
          </div>
        </div>

        {/* Quick Date Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-1 px-1">
          <button
            onClick={() => setDateFilter('7d')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              dateFilter === '7d'
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff]'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setDateFilter('30d')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              dateFilter === '30d'
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff]'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setDateFilter('90d')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              dateFilter === '90d'
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff]'
            }`}
          >
            Last 90 Days
          </button>
          <button
            onClick={() => setDateFilter('custom')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer ${
              dateFilter === 'custom'
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464555] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Custom Range</span>
          </button>
        </div>
      </section>

      {/* 4 Key Metric Cards (2x2 Grid) */}
      <section className="grid grid-cols-2 gap-3">
        {/* Metric 1: Visitors */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#565e74] uppercase tracking-wider font-semibold">
              Website Visitors
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#0b1c30] tracking-tight font-bold">
              {metrics.visitors}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="flex items-center text-xs text-[#006d62] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {metrics.vChange}
              </span>
              <span className="text-[11px] text-[#565e74]">vs mo</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Conversations */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#565e74] uppercase tracking-wider font-semibold">
              Conversations
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[18px]">forum</span>
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#0b1c30] tracking-tight font-bold">
              {metrics.convs}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="flex items-center text-xs text-[#006d62] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {metrics.cChange}
              </span>
              <span className="text-[11px] text-[#565e74]">vs mo</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Leads Captured */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#565e74] uppercase tracking-wider font-semibold">
              Leads Captured
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006d62]">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl text-[#0b1c30] tracking-tight font-bold">
              {metrics.leads}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="flex items-center text-xs text-[#006d62] font-bold">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                {metrics.lChange}
              </span>
              <span className="text-[11px] text-[#565e74]">vs mo</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Lead Conversion Rate */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#565e74] uppercase tracking-wider font-semibold">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl text-[#0b1c30] tracking-tight font-bold">
                {metrics.rate}
              </span>
              <svg className="w-12 h-5 text-[#006d62]" fill="none" viewBox="0 0 48 20">
                <path
                  d="M1 17L12 11L24 14L36 6L47 2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="flex items-center text-xs text-[#006d62] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {metrics.rChange}
              </span>
              <span className="text-[11px] text-[#565e74]">positive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Trends Card */}
      <section className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base text-[#0b1c30] font-bold">Conversations &amp; Leads</h2>
            <p className="text-xs text-[#565e74]">Aggregate performance over the current period</p>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Legend */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
                <span className="text-xs text-[#565e74]">Chats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4fdbc8]"></span>
                <span className="text-xs text-[#565e74]">Leads</span>
              </div>
            </div>
            {/* Segmented Tab Toggle */}
            <div className="flex bg-[#eff4ff] p-0.5 rounded-lg border border-[#e5eeff]">
              <button
                onClick={() => setChartView('daily')}
                className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-all ${
                  chartView === 'daily'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#565e74] hover:text-[#0b1c30]'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setChartView('weekly')}
                className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-all ${
                  chartView === 'weekly'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#565e74] hover:text-[#0b1c30]'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
        </div>

        {/* Visual Chart Representation (Line + Bars SVG) */}
        <div className="w-full h-44 relative flex flex-col justify-end pt-2">
          {/* Background Guide Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            <div className="w-full h-px bg-[#eff4ff]"></div>
            <div className="w-full h-px bg-[#eff4ff]"></div>
            <div className="w-full h-px bg-[#eff4ff]"></div>
            <div className="w-full h-px bg-[#eff4ff]"></div>
          </div>

          {/* Combined SVG Visualization */}
          <svg className="w-full h-36 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 120">
            {/* Lead Captured Bars (Teal #4fdbc8) */}
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '50' : '40'} opacity="0.85" rx="3" width="12" x="20" y={chartView === 'daily' ? '70' : '80'} />
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '65' : '60'} opacity="0.85" rx="3" width="12" x="65" y={chartView === 'daily' ? '55' : '60'} />
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '75' : '80'} opacity="0.85" rx="3" width="12" x="110" y={chartView === 'daily' ? '45' : '40'} />
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '60' : '55'} opacity="0.85" rx="3" width="12" x="155" y={chartView === 'daily' ? '60' : '65'} />
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '85' : '90'} opacity="0.85" rx="3" width="12" x="200" y={chartView === 'daily' ? '35' : '30'} />
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '92' : '95'} opacity="0.85" rx="3" width="12" x="245" y={chartView === 'daily' ? '28' : '25'} />
            <rect fill="#4fdbc8" height={chartView === 'daily' ? '102' : '105'} opacity="0.9" rx="3" width="12" x="290" y={chartView === 'daily' ? '18' : '15'} />

            {/* Conversations Curve (Indigo #4f46e5) */}
            <defs>
              <linearGradient id="primaryCurveGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d={chartView === 'daily' ? 'M 26 65 Q 65 35, 116 40 T 206 20 T 296 10' : 'M 26 75 Q 65 50, 116 35 T 206 15 T 296 12'}
              fill="none"
              stroke="#4f46e5"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d={chartView === 'daily' ? 'M 26 65 Q 65 35, 116 40 T 206 20 T 296 10 L 296 120 L 26 120 Z' : 'M 26 75 Q 65 50, 116 35 T 206 15 T 296 12 L 296 120 L 26 120 Z'}
              fill="url(#primaryCurveGrad)"
              opacity="0.7"
            />

            {/* Interactive Point Highlights */}
            <circle cx="206" cy={chartView === 'daily' ? '20' : '15'} fill="#ffffff" r="4" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="296" cy={chartView === 'daily' ? '10' : '12'} fill="#ffffff" r="4" stroke="#4f46e5" strokeWidth="2.5" />
          </svg>

          {/* X-Axis Labels */}
          <div className="flex justify-between items-center text-[#565e74] text-xs pt-2">
            <span>{chartView === 'daily' ? 'Mon' : 'W1'}</span>
            <span>{chartView === 'daily' ? 'Tue' : 'W2'}</span>
            <span>{chartView === 'daily' ? 'Wed' : 'W3'}</span>
            <span>{chartView === 'daily' ? 'Thu' : 'W4'}</span>
            <span>{chartView === 'daily' ? 'Fri' : 'W5'}</span>
            <span>{chartView === 'daily' ? 'Sat' : 'W6'}</span>
            <span className="font-bold text-[#0b1c30]">{chartView === 'daily' ? 'Sun' : 'W7'}</span>
          </div>
        </div>
      </section>

      {/* Recent Leads Section */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base text-[#0b1c30] font-bold">Recent Leads</h2>
            <span className="bg-[#dae2fd] text-[#131b2e] text-xs px-2 py-0.5 rounded-full font-bold">
              {leads.filter(l => l.status === 'new').length || 4} New
            </span>
          </div>
          <button
            onClick={() => onNavigate('leads')}
            className="text-xs text-[#4f46e5] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>View All Leads</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Leads List */}
        <div className="flex flex-col space-y-2">
          {leads.slice(0, 4).map((lead) => (
            <div
              key={lead.id}
              onClick={() => {
                if (onSelectLead) onSelectLead(lead);
                onNavigate('leads');
              }}
              className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col space-y-2 hover:border-[#4f46e5]/40 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-sm font-bold text-[#4f46e5] shrink-0">
                    {lead.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#0b1c30] truncate">{lead.name}</h3>
                    <p className="text-xs text-[#565e74] truncate">{lead.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 capitalize ${
                    lead.status === 'qualified'
                      ? 'bg-[#71f8e4] text-[#00201c]'
                      : lead.status === 'new'
                      ? 'bg-[#dae2fd] text-[#131b2e]'
                      : 'bg-[#e5eeff] text-[#464555]'
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-[#565e74]">
                <div className="flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-[16px] shrink-0 text-[#565e74]">call</span>
                  <span className="truncate">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[11px] bg-[#eff4ff] px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[14px] text-[#4f46e5]">smart_toy</span>
                  <span>{lead.agent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Conversations Section */}
      <section className="flex flex-col space-y-2 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-[#0b1c30] font-bold">Recent Conversations</h2>
          <button
            onClick={() => onNavigate('chats')}
            className="text-[#565e74] hover:text-[#0b1c30] p-1 rounded"
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Conversation 1 */}
          <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4fdbc8]"></div>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30]">Visitor #8841</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#71f8e4] text-[#00201c] font-bold">
                Lead Created
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#565e74]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>Enterprise Closer</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>4m 12s</span>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-[#565e74]">2 mins ago</span>
              <button
                onClick={() => {
                  if (onSelectConversation) onSelectConversation('conv-1');
                  onNavigate('chats');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#4f46e5] text-xs font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              >
                View Conversation
              </button>
            </div>
          </div>

          {/* Conversation 2 */}
          <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#c7c4d8]"></div>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30]">Visitor #8839</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#d3e4fe] text-[#464555] font-bold">
                Support Resolved
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#565e74]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>Tech Support AI</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>1m 45s</span>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-[#565e74]">14 mins ago</span>
              <button
                onClick={() => {
                  if (onSelectConversation) onSelectConversation('conv-2');
                  onNavigate('chats');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#4f46e5] text-xs font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              >
                View Conversation
              </button>
            </div>
          </div>

          {/* Conversation 3 */}
          <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4fdbc8]"></div>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30]">Visitor #8834</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#71f8e4] text-[#00201c] font-bold">
                Lead Created
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#565e74]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>SaaS Pricing Bot</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>3m 08s</span>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-[#565e74]">28 mins ago</span>
              <button
                onClick={() => {
                  if (onSelectConversation) onSelectConversation('conv-1');
                  onNavigate('chats');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#4f46e5] text-xs font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              >
                View Conversation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
