import React, { useState } from 'react';
import { ScreenType, Lead } from '../types';
import { APP_ASSETS } from '../mockData';

interface LandingPageProps {
  onNavigate: (screen: ScreenType) => void;
  onAddLead: (lead: Omit<Lead, 'id'>) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onAddLead,
  onShowToast,
}) => {
  // Interactive widget simulation state
  const [visitorName, setVisitorName] = useState('Sarah Jenkins');
  const [visitorEmail, setVisitorEmail] = useState('sarah@acmecorp.io');
  const [visitorPhone, setVisitorPhone] = useState('+1 (555) 234-8901');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'user',
      text: 'Hi! Does Orken AI sync directly with our company CRM and support docs?',
    },
    {
      sender: 'bot',
      text: 'Yes, absolutely! We index your internal documentation, Notion, and sync captured qualified leads right into HubSpot and Salesforce in real-time.',
    },
  ]);
  const [questionInput, setQuestionInput] = useState('');

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorEmail) return;

    onAddLead({
      name: visitorName || 'New Prospect',
      initials: (visitorName || 'NP').slice(0, 2).toUpperCase(),
      company: visitorEmail.includes('@') ? visitorEmail.split('@')[1].split('.')[0].toUpperCase() : 'Acme Corp',
      email: visitorEmail,
      phone: visitorPhone || '+1 (555) 000-0000',
      requirement: 'Booked priority consultation via homepage live widget',
      agent: 'Homepage Bot',
      status: 'qualified',
      timestamp: 'Just now',
      consent: 'Yes (Live form booked)',
      score: 95,
      notes: [
        { id: `note-${Date.now()}`, text: 'Instant demo consultation requested from public website.', time: 'Just now' }
      ]
    });

    setFormSubmitted(true);
    onShowToast('Consultation Booked! Lead synced to Admin Console.', 'verified');
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    const userText = questionInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuestionInput('');

    setTimeout(() => {
      let botResponse = "I've logged your request! You can connect your team or explore our automated lead qualification models.";
      const lower = userText.toLowerCase();
      if (lower.includes('price') || lower.includes('cost')) {
        botResponse = 'Our plans start with a Growth tier for up to 10,000 monthly chats and full CRM sync. Would you like a custom quote?';
      } else if (lower.includes('crm') || lower.includes('hubspot') || lower.includes('salesforce')) {
        botResponse = 'We support 1-click webhook and bidirectional sync with HubSpot, Salesforce, and Zendesk.';
      } else if (lower.includes('demo') || lower.includes('talk')) {
        botResponse = 'Enter your contact details in the form above and our product team will be in touch!';
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-[#eff4ff]">
        <div className="flex items-center gap-2.5">
          <img
            alt="Orken AI Logo"
            className="w-8 h-8 rounded-lg object-contain shadow-xs"
            src={APP_ASSETS.logo}
          />
          <span className="text-xl font-bold tracking-tight text-[#0b1c30]">
            Orken AI
          </span>
        </div>

        {/* Navigation Links & Admin Action */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-[#464555] font-semibold text-sm">
            <a className="hover:text-[#3525cd] transition-colors" href="#home">Home</a>
            <a className="hover:text-[#3525cd] transition-colors" href="#about">About</a>
            <a className="hover:text-[#3525cd] transition-colors" href="#services">Services</a>
            <a className="hover:text-[#3525cd] transition-colors" href="#how-it-works">Process</a>
          </nav>
          
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 bg-[#0b1c30] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:opacity-95 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Admin Login</span>
          </button>
        </div>
      </header>

      {/* Quick Anchors (Mobile pill nav) */}
      <div className="flex md:hidden items-center justify-around bg-[#eff4ff] px-4 py-2 border-b border-[#e5eeff]">
        <a className="text-[#464555] text-xs font-semibold hover:text-[#3525cd]" href="#home">Home</a>
        <span className="text-[#c7c4d8] text-xs">•</span>
        <a className="text-[#464555] text-xs font-semibold hover:text-[#3525cd]" href="#about">About</a>
        <span className="text-[#c7c4d8] text-xs">•</span>
        <a className="text-[#464555] text-xs font-semibold hover:text-[#3525cd]" href="#services">Services</a>
        <span className="text-[#c7c4d8] text-xs">•</span>
        <a className="text-[#464555] text-xs font-semibold hover:text-[#3525cd]" href="#how-it-works">Process</a>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Hero Section */}
        <section className="w-full pt-4 pb-12 flex flex-col items-center text-center" id="home">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#e5eeff] rounded-full shadow-xs mb-4">
            <span className="material-symbols-outlined text-[#006d62] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-xs text-[#00534a] font-semibold">
              AI-Powered Customer Support &amp; Lead Generation
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl text-[#0b1c30] font-extrabold tracking-tight max-w-2xl mb-4 leading-tight">
            Turn Every Website Visitor Into an Opportunity.
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-base sm:text-lg text-[#464555] max-w-xl mb-8 leading-relaxed">
            Intelligent AI agents answer customer questions, provide 24/7 support, and capture valuable leads automatically.
          </p>

          {/* CTAs */}
          <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3 mb-8 justify-center">
            <a
              href="#services"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#3525cd] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#4f46e5] active:scale-95 transition-all text-center"
            >
              Explore Our Services
            </a>
            <button
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#0b1c30] border border-[#e5eeff] text-sm font-semibold rounded-lg shadow-xs hover:bg-[#eff4ff] active:scale-95 transition-all text-center cursor-pointer"
            >
              Admin Login
            </button>
          </div>

          {/* 3 Concise Benefit Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-1.5 px-3.5 py-1 bg-[#eff4ff] rounded-full border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#3525cd] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-xs font-semibold text-[#0b1c30]">24/7 Support</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1 bg-[#eff4ff] rounded-full border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#3525cd] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <span className="text-xs font-semibold text-[#0b1c30]">Smart Lead Capture</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1 bg-[#eff4ff] rounded-full border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#3525cd] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                hub
              </span>
              <span className="text-xs font-semibold text-[#0b1c30]">Business-Specific AI</span>
            </div>
          </div>

          {/* Realistic Product Mockup: Interactive Chatbot Widget & Lead Flow */}
          <div className="w-full max-w-md relative">
            {/* Mini floating analytics badge */}
            <div className="absolute -top-3.5 right-2 z-20 flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full shadow-lg border border-[#e5eeff]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4fdbc8] animate-pulse"></span>
              <span className="text-xs font-bold text-[#00534a]">+38% Lead Conversion Today</span>
            </div>

            {/* Chat Container Frame */}
            <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden text-left flex flex-col border border-[#dce9ff]">
              {/* Chat Header */}
              <div className="bg-[#3525cd] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#71f8e4] border border-[#3525cd]"></span>
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">Orken Assistant</div>
                    <div className="text-[11px] text-[#dad7ff]">Active Now • Online</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#dad7ff] text-[20px]">more_vert</span>
              </div>

              {/* Chat Conversation Stream */}
              <div className="p-4 flex flex-col gap-3 bg-white max-h-[420px] overflow-y-auto">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      msg.sender === 'user' ? 'self-end max-w-[85%]' : 'self-start max-w-[88%]'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-[#e2dfff] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[#3525cd] text-[14px]">smart_toy</span>
                      </div>
                    )}
                    <div
                      className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#e5eeff] rounded-tr-xs text-[#0b1c30] shadow-xs'
                          : 'bg-[#eff4ff] rounded-tl-xs text-[#0b1c30] shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Inline Lead Capture Form Card */}
                {!formSubmitted ? (
                  <form onSubmit={handleBookConsultation} className="mt-1 bg-[#eff4ff] rounded-xl p-3.5 border border-[#dce9ff] shadow-xs flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[#3525cd]">
                      <span className="material-symbols-outlined text-[18px]">contact_mail</span>
                      <span className="text-xs font-bold text-[#0b1c30]">Connect with a Specialist</span>
                    </div>
                    <p className="text-[11px] text-[#464555]">
                      Enter your details to receive an instant live demo tailored to your domain.
                    </p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <input
                        className="w-full bg-white px-3 py-2 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#777587] focus:outline-none focus:ring-1 focus:ring-[#3525cd] border border-[#e5eeff] shadow-2xs"
                        placeholder="Full Name"
                        type="text"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        required
                      />
                      <input
                        className="w-full bg-white px-3 py-2 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#777587] focus:outline-none focus:ring-1 focus:ring-[#3525cd] border border-[#e5eeff] shadow-2xs"
                        placeholder="Work Email"
                        type="email"
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        required
                      />
                      <input
                        className="w-full bg-white px-3 py-2 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#777587] focus:outline-none focus:ring-1 focus:ring-[#3525cd] border border-[#e5eeff] shadow-2xs"
                        placeholder="Phone Number"
                        type="tel"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                      />
                    </div>
                    <button
                      className="mt-1 w-full py-2.5 bg-[#3525cd] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#4f46e5] active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      type="submit"
                    >
                      <span>Book Priority Consultation</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </form>
                ) : (
                  <div className="mt-1 bg-[#dae2fd]/40 rounded-xl p-3.5 border border-[#4fdbc8] flex items-center gap-2.5 text-[#00534a]">
                    <span className="material-symbols-outlined text-[#006d62] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <h4 className="text-xs font-bold">Consultation Booked!</h4>
                      <p className="text-[11px] text-[#464555]">
                        Thanks {visitorName}! Your details are queued and synced to our team console.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Mockup (Functional) */}
              <form onSubmit={handleSendQuestion} className="p-2.5 bg-[#eff4ff] border-t border-[#e5eeff] flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="flex-1 bg-white px-3.5 py-2 rounded-full text-xs text-[#0b1c30] placeholder:text-[#777587] outline-none border border-[#e5eeff] focus:border-[#3525cd]"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center text-white shadow-xs hover:bg-[#4f46e5] active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-12 flex flex-col gap-6" id="about">
          <div className="text-center max-w-md mx-auto mb-2">
            <div className="text-xs text-[#3525cd] uppercase font-bold tracking-wider mb-1">
              Engineered for Reliability
            </div>
            <h2 className="text-2xl sm:text-3xl text-[#0b1c30] font-bold tracking-tight">
              AI Solutions Built Around Your Business.
            </h2>
            <p className="text-sm text-[#464555] mt-2 leading-relaxed">
              Trained exclusively on your workflows, knowledge bases, and sales playbooks. No generic hallucinations.
            </p>
          </div>

          {/* 3 Concise Feature Cards */}
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex items-start gap-4 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#dae2fd] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#5c647a] text-[22px]">forum</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-[#0b1c30] font-bold mb-1">Intelligent Customer Support</h3>
                <p className="text-xs sm:text-sm text-[#464555] leading-relaxed">
                  Resolves customer queries instantly with context-aware natural language understanding and sub-second response times.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex items-start gap-4 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#d3e4fe] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#3525cd] text-[22px]">conversion_path</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-[#0b1c30] font-bold mb-1">Automated Lead Generation</h3>
                <p className="text-xs sm:text-sm text-[#464555] leading-relaxed">
                  Identifies buying signals in chats, prompts custom qualification questionnaires, and captures high-intent contact records.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex items-start gap-4 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#00534a] text-[22px]">dataset</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-[#0b1c30] font-bold mb-1">Business Knowledge Integration</h3>
                <p className="text-xs sm:text-sm text-[#464555] leading-relaxed">
                  Securely ingests product sheets, pricing tables, API guides, and brand policies to provide 100% compliant and precise answers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 flex flex-col gap-6" id="services">
          <div className="text-center max-w-md mx-auto mb-2">
            <div className="text-xs text-[#3525cd] uppercase font-bold tracking-wider mb-1">
              Enterprise Capability
            </div>
            <h2 className="text-2xl sm:text-3xl text-[#0b1c30] font-bold tracking-tight">
              Everything You Need to Automate Customer Conversations.
            </h2>
            <p className="text-sm text-[#464555] mt-2">
              A complete conversational stack calibrated to boost operational output and sales volume.
            </p>
          </div>

          {/* 4 Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service 1 */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#e2dfff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3525cd] text-[20px]">chat_bubble</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[11px] text-[#3525cd] font-bold">
                  Conversational AI
                </span>
              </div>
              <div>
                <h3 className="text-base text-[#0b1c30] font-bold">AI Website Chatbots</h3>
                <p className="text-xs text-[#464555] mt-1">Lightweight, accessible chat embeds designed for zero layout shifts and rapid answers.</p>
              </div>
              <ul className="flex flex-col gap-1.5 pt-2">
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Multilingual 24/7 engagement</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Human escalation logic &amp; webhooks</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Custom brand voice styling</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#dae2fd] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#131b2e] text-[20px]">group_add</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[11px] text-[#00534a] font-bold">
                  Growth &amp; Revenue
                </span>
              </div>
              <div>
                <h3 className="text-base text-[#0b1c30] font-bold">AI Lead Generation Agents</h3>
                <p className="text-xs text-[#464555] mt-1">Active listening algorithms that qualify leads and prompt calendar scheduling dynamically.</p>
              </div>
              <ul className="flex flex-col gap-1.5 pt-2">
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Automated intent scoring</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Interactive meeting booking</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Instant push notifications via Slack</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#e5eeff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3525cd] text-[20px]">sync_saved_locally</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[11px] text-[#464555] font-bold">
                  Knowledge Hub
                </span>
              </div>
              <div>
                <h3 className="text-base text-[#0b1c30] font-bold">Business Knowledge Integration</h3>
                <p className="text-xs text-[#464555] mt-1">Effortless synchronization with cloud files, live URLs, documentation, and databases.</p>
              </div>
              <ul className="flex flex-col gap-1.5 pt-2">
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Syncs PDFs, Zendesk, Notion &amp; CMS</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Weekly automatic retraining cycles</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Source citation verification</span>
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#d3e4fe] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0b1c30] text-[20px]">insights</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[11px] text-[#3525cd] font-bold">
                  Real-time Data
                </span>
              </div>
              <div>
                <h3 className="text-base text-[#0b1c30] font-bold">Analytics and Lead Management</h3>
                <p className="text-xs text-[#464555] mt-1">Centralized command view to inspect live chat logs, review lead submissions, and spot gaps.</p>
              </div>
              <ul className="flex flex-col gap-1.5 pt-2">
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Live sentiment tracking</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Single-click CSV &amp; webhook exports</span>
                </li>
                <li className="flex items-center gap-2 text-[#464555] text-xs">
                  <span className="material-symbols-outlined text-[#006d62] text-[16px]">check_circle</span>
                  <span>Drop-off &amp; friction analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 flex flex-col gap-6" id="how-it-works">
          <div className="text-center max-w-md mx-auto">
            <div className="text-xs text-[#3525cd] uppercase font-bold tracking-wider mb-1">
              Simple Onboarding
            </div>
            <h2 className="text-2xl sm:text-3xl text-[#0b1c30] font-bold tracking-tight">
              From Setup to Qualified Leads in Minutes.
            </h2>
          </div>

          {/* 3-Step Roadmap */}
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[#e5eeff] shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#3525cd] text-white text-lg font-bold flex items-center justify-center shrink-0 shadow-sm">
                1
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-[#0b1c30] font-bold">Configure Your Business Knowledge</h3>
                <p className="text-xs sm:text-sm text-[#464555] mt-1 leading-relaxed">
                  Upload company documents, support catalogs, or input your URL. Orken AI parses and learns your company identity within seconds.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[#e5eeff] shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#565e74] text-white text-lg font-bold flex items-center justify-center shrink-0 shadow-sm">
                2
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-[#0b1c30] font-bold">Deploy the AI Chatbot on Your Website</h3>
                <p className="text-xs sm:text-sm text-[#464555] mt-1 leading-relaxed">
                  Paste a single lightweight script tag onto your site, Webflow, Shopify, or WordPress. The bot matches your brand styling immediately.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[#e5eeff] shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#006d62] text-white text-lg font-bold flex items-center justify-center shrink-0 shadow-sm">
                3
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-[#0b1c30] font-bold">Capture Leads and Monitor Performance</h3>
                <p className="text-xs sm:text-sm text-[#464555] mt-1 leading-relaxed">
                  Sit back as visitors convert into qualified leads. Monitor transcripts, customer satisfaction scores, and follow up instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full my-6 bg-white rounded-2xl border border-[#dce9ff] shadow-sm p-6 sm:p-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#e2dfff] flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[#3525cd] text-[24px]">rocket_launch</span>
          </div>
          <h2 className="text-2xl text-[#0b1c30] font-bold tracking-tight mb-2">
            Make Your Website Work Smarter.
          </h2>
          <p className="text-xs sm:text-sm text-[#464555] max-w-sm mb-6">
            Deploy enterprise-grade conversational AI that drives real business growth, 24 hours a day.
          </p>
          <div className="w-full max-w-xs flex flex-col gap-2.5">
            <a
              href="#services"
              className="w-full py-3 bg-[#3525cd] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#4f46e5] active:scale-95 transition-all text-center"
            >
              Explore Services
            </a>
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-3 bg-[#eff4ff] text-[#0b1c30] text-sm font-semibold rounded-lg hover:bg-[#dce9ff] active:scale-95 transition-all text-center cursor-pointer"
            >
              Admin Login
            </button>
          </div>
        </section>

        {/* Minimalist Footer */}
        <footer className="w-full pt-10 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="Orken AI Logo"
              className="w-6 h-6 rounded-md object-contain"
              src={APP_ASSETS.logo}
            />
            <span className="text-sm font-bold text-[#0b1c30]">Orken AI</span>
          </div>
          <p className="text-xs text-[#464555] max-w-xs">
            Intelligent automated support and high-precision lead capture for ambitious digital businesses.
          </p>
          
          <div className="flex items-center gap-4 text-[#464555] text-xs font-semibold">
            <a className="hover:text-[#3525cd] transition-colors" href="#home">Home</a>
            <a className="hover:text-[#3525cd] transition-colors" href="#about">About</a>
            <a className="hover:text-[#3525cd] transition-colors" href="#services">Services</a>
            <button
              onClick={() => onNavigate('login')}
              className="hover:text-[#3525cd] transition-colors cursor-pointer"
            >
              Admin Login
            </button>
          </div>

          <div className="flex flex-col items-center gap-1 text-[11px] text-[#777587]">
            <div className="flex items-center gap-2">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
            </div>
            <div className="text-[10px] text-[#c7c4d8] mt-1">
              Copyright © 2025 Orken AI. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
