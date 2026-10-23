import { Lead, ConversationSession, AgentConfig, KnowledgeDocument } from './types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    initials: 'SJ',
    company: 'Vertex Cloud',
    email: 'sarah.j@vertexcloud.com',
    phone: '+1 (555) 382-9912',
    requirement: 'Needs enterprise CRM chatbot integration for 5,000 monthly queries',
    agent: 'Sales Agent v2',
    status: 'qualified',
    timestamp: 'Today, 10:45 AM',
    consent: 'Yes (Captured via widget form)',
    score: 96,
    notes: [
      { id: 'n1', text: 'Assigned SDR outreach scheduled for 2:00 PM EST.', time: '10 mins ago' },
      { id: 'n2', text: 'Checked budget authority: VP of Customer Success approval in place.', time: '1 hour ago' }
    ]
  },
  {
    id: 'lead-2',
    name: 'David Chen',
    initials: 'DC',
    company: 'Nexus FinTech',
    email: 'dchen@nexusfin.io',
    phone: '+1 (555) 749-2104',
    requirement: 'Evaluating automated onboarding agent for compliance queries',
    agent: 'Homepage Chatbot',
    status: 'new',
    timestamp: 'Today, 09:12 AM',
    consent: 'Yes (Session timestamp logged)',
    score: 92,
    notes: [
      { id: 'n3', text: 'Initial prospect triage queue entered.', time: 'Today, 09:15 AM' }
    ]
  },
  {
    id: 'lead-3',
    name: 'Elena Rostova',
    initials: 'ER',
    company: 'Apex Media Co',
    email: 'elena@apexmedia.co',
    phone: '+1 (555) 902-1845',
    requirement: 'Self-serve pricing guide query turned into agency inquiry',
    agent: 'Pricing Assistant',
    status: 'contacted',
    timestamp: 'Yesterday, 6:15 PM',
    consent: 'Yes (Inbound request)',
    score: 84,
    notes: [
      { id: 'n4', text: 'Sent personalized pitch deck via HubSpot template.', time: 'Yesterday, 7:00 PM' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Marcus Brody',
    initials: 'MB',
    company: 'Solar Turn Energy',
    email: 'm.brody@solarturn.com',
    phone: '+1 (555) 438-1190',
    requirement: 'Product catalog FAQ automation across 12 branch websites',
    agent: 'Product FAQ Bot',
    status: 'new',
    timestamp: 'Yesterday, 5:02 PM',
    consent: 'Yes (Widget form)',
    score: 88,
    notes: []
  },
  {
    id: 'lead-5',
    name: 'Marcus Vance',
    initials: 'MV',
    company: 'Vance & Co Logistics',
    email: 'm.vance@vancelog.com',
    phone: '+1 (555) 832-7719',
    requirement: 'Requesting live demo and team pricing for 10 agents',
    agent: 'Pricing Assistant',
    status: 'contacted',
    timestamp: 'Yesterday, 4:20 PM',
    consent: 'Yes (Enterprise NDA opted)',
    score: 90,
    notes: [
      { id: 'n5', text: 'Follow-up call booked for tomorrow 11:00 AM PST.', time: 'Yesterday, 5:30 PM' }
    ]
  }
];

export const INITIAL_CONVERSATIONS: ConversationSession[] = [
  {
    id: 'conv-1',
    convNumber: '#CONV-8821',
    visitorName: 'Sarah Jenkins',
    initials: 'SJ',
    location: 'San Francisco, CA',
    browser: 'Chrome / macOS',
    agentName: 'Sales Agent v2',
    status: 'lead_captured',
    duration: '4m 12s',
    timeAgo: '2 mins ago',
    snippet: 'Sarah Jenkins, sarah.j@vertexcloud.com, phone 555-382-9912...',
    hasLead: true,
    leadEmail: 'sarah.j@vertexcloud.com',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        name: 'Sarah Jenkins',
        time: '10:42 AM',
        text: 'Hi there! Does your AI chatbot support custom webhooks and Salesforce CRM sync?'
      },
      {
        id: 'm2',
        sender: 'agent',
        name: 'Sales Agent v2',
        time: '10:42 AM',
        text: 'Hello! Yes, Orken AI provides native Salesforce integration and bidirectional webhooks to push leads instantly to your CRM pipelines.',
        matchedKb: 'CRM_Integrations_v4'
      },
      {
        id: 'm3',
        sender: 'user',
        name: 'Sarah Jenkins',
        time: '10:43 AM',
        text: 'Great, can we get pricing for 5,000 monthly chats and 3 custom trained models?'
      },
      {
        id: 'm4',
        sender: 'agent',
        name: 'Sales Agent v2',
        time: '10:44 AM',
        text: 'Certainly! Our Growth plan covers up to 10,000 chats with unlimited custom models. May I have your name and email so our solutions specialist can send the customized quote?',
        tag: 'Intent: High-Value Pricing Ingestion'
      },
      {
        id: 'm5',
        sender: 'user',
        name: 'Sarah Jenkins',
        time: '10:45 AM',
        text: 'Sarah Jenkins, sarah.j@vertexcloud.com, phone 555-382-9912. Company is Vertex Cloud.',
        tag: 'Entity Extracted: Name, Email, Phone, Account'
      },
      {
        id: 'm6',
        sender: 'agent',
        name: 'Sales Agent v2',
        time: '10:45 AM',
        text: "Thank you Sarah! I've logged your request. Someone from our enterprise team will reach out within 2 business hours.",
        deliveredToCrm: true
      }
    ]
  },
  {
    id: 'conv-2',
    convNumber: '#CONV-8820',
    visitorName: 'Markus Keller',
    initials: 'MK',
    location: 'Berlin, Germany',
    browser: 'Safari / iOS',
    agentName: 'Support Desk Bot',
    status: 'resolved',
    duration: '1m 45s',
    timeAgo: '14 mins ago',
    snippet: 'Got it, that explains the SSO configuration process. Thank you!',
    hasLead: false,
    messages: [
      {
        id: 'mk1',
        sender: 'user',
        name: 'Markus Keller',
        time: '10:36 AM',
        text: 'Where do I find SAML 2.0 metadata XML in the console settings?'
      },
      {
        id: 'mk2',
        sender: 'agent',
        name: 'Support Desk Bot',
        time: '10:37 AM',
        text: 'Under Settings > Account Security > Single Sign-On, you can download your SAML metadata file or copy the ACS URL directly.'
      },
      {
        id: 'mk3',
        sender: 'user',
        name: 'Markus Keller',
        time: '10:38 AM',
        text: 'Got it, that explains the SSO configuration process. Thank you!'
      }
    ]
  },
  {
    id: 'conv-3',
    convNumber: '#CONV-8819',
    visitorName: 'Anonymous Visitor',
    initials: '?',
    location: 'Chicago, IL',
    browser: 'Edge / Windows',
    agentName: 'Triage Assistant',
    status: 'escalation',
    duration: '3m 08s',
    timeAgo: '28 mins ago',
    snippet: 'I need to speak to someone right now about security compliance breach.',
    hasLead: false,
    messages: [
      {
        id: 'anon1',
        sender: 'user',
        name: 'Anonymous Visitor',
        time: '10:29 AM',
        text: 'I need to speak to someone right now about security compliance breach.'
      },
      {
        id: 'anon2',
        sender: 'agent',
        name: 'Triage Assistant',
        time: '10:30 AM',
        text: 'I am immediately escalating this to our designated Security Incident Response team. Please hold while a human specialist joins.'
      }
    ]
  }
];

export const INITIAL_AGENTS: AgentConfig[] = [
  {
    id: 'ag_892b1',
    name: 'Sales & Lead Gen',
    url: 'https://orken.ai/pricing',
    status: 'active',
    chatsCount: 2840,
    leadsCount: 412,
    convRate: '14.5%',
    persona: 'professional',
    greetingMessage: 'Hello! Welcome to our website. How can I help you today?',
    accentColor: '#4F46E5',
    widgetPosition: 'bottom-right',
    requiredFields: {
      name: true,
      email: true,
      phone: true,
      company: true
    },
    triggerCondition: 'When visitor asks about pricing or after 3 consecutive messages.',
    knowledgeSources: [
      { id: 'k1', name: '2025_Product_Pricing.pdf', size: '1.4 MB', updated: 'Updated 2 days ago • Synced', type: 'pdf' },
      { id: 'k2', name: 'Company_FAQ_v3.docx', size: '840 KB', updated: 'Updated yesterday • Synced', type: 'docx' }
    ],
    embedSnippet: '<script src="https://cdn.orken.ai/widget.js" data-agent-id="ag_892b1" async></script>'
  },
  {
    id: 'ag_tech_2',
    name: 'Technical Support Bot',
    url: 'https://docs.orken.ai',
    status: 'active',
    chatsCount: 1120,
    leadsCount: 180,
    convRate: '16.1%',
    persona: 'technical',
    greetingMessage: 'Hi there! Looking for API specs, SDK guides, or webhook setups? Ask me anything.',
    accentColor: '#00534a',
    widgetPosition: 'bottom-right',
    requiredFields: {
      name: true,
      email: true,
      phone: false,
      company: true
    },
    triggerCondition: 'When visitor asks for architecture review or SLA terms.',
    knowledgeSources: [
      { id: 'k3', name: 'Technical_Specifications_Sheet.txt', size: '120 KB', updated: 'Updated Today, 11:24 AM', type: 'docx' }
    ],
    embedSnippet: '<script src="https://cdn.orken.ai/widget.js" data-agent-id="ag_tech_2" async></script>'
  },
  {
    id: 'ag_promo_3',
    name: 'Holiday Promo Bot',
    url: 'https://orken.ai/campaigns/holiday',
    status: 'paused',
    chatsCount: 640,
    leadsCount: 95,
    convRate: '14.8%',
    persona: 'professional',
    greetingMessage: 'Welcome! Grab our exclusive seasonal discount on enterprise plans today.',
    accentColor: '#ba1a1a',
    widgetPosition: 'bottom-left',
    requiredFields: {
      name: true,
      email: true,
      phone: true,
      company: false
    },
    triggerCondition: 'Immediate greeting popover on page load.',
    knowledgeSources: [],
    embedSnippet: '<script src="https://cdn.orken.ai/widget.js" data-agent-id="ag_promo_3" async></script>'
  }
];

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'doc-1',
    name: 'Enterprise_Pricing_Guide_2025.pdf',
    type: 'pdf',
    size: '1.4 MB',
    uploadDate: 'Oct 12, 2025',
    status: 'ready',
    embeddingsCount: 184
  },
  {
    id: 'doc-2',
    name: 'Customer_Support_FAQs_v4.docx',
    type: 'docx',
    size: '840 KB',
    uploadDate: 'Oct 10, 2025',
    status: 'ready',
    embeddingsCount: 92
  },
  {
    id: 'doc-3',
    name: 'Technical_Specifications_Sheet.txt',
    type: 'txt',
    size: '120 KB',
    uploadDate: 'Today, 11:24 AM',
    status: 'processing',
    progressPercent: 78,
    chunkInfo: 'Chunk 39 / 50'
  },
  {
    id: 'doc-4',
    name: 'Lead_Qualification_Rules.csv',
    type: 'csv',
    size: '45 KB',
    uploadDate: 'Yesterday',
    status: 'ready',
    decisionNodesCount: 42
  },
  {
    id: 'doc-5',
    name: 'Outdated_Brochure_2023.pdf',
    type: 'pdf',
    size: '3.2 MB',
    uploadDate: 'Sep 15, 2025',
    status: 'failed',
    failureReason: 'OCR parsing timeout'
  }
];

export const APP_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VNxuDI5_JO9KGNbz0fosLwBFIkOJuwcavIqmDXODd4w0ZRHngs-_JVau98MSgJjNeATOwzxhptTt8W06DxlUo19T_s0D0XLnv1iv6y9w8D49yS50YlhtqxqE7thik1kC0EeDnCNcb8J36UCqmrvEj9ltwChAUi1wj3fLIbjIslOepFH_26CjuWzA_wY9mco7QhjdUAbZ6RWq-Pw-NCSDjKTAxfwLPTsUlV-QD0PMs7z-fIo1jIyuSTs1g',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2o7HhX0_ZS7gnV7A0jfOGZlbXMDWZQHUZi81FKnQ7NR5mrDXvxHk-QyL2tbn5otw8ZAwIJ47w1QjceeP8HTyX0zHK1eU2KlErVuWq3uwFLF2m_yAolGztVdirNgc66PQNxqq9XEblYTpCkLdfEVeTmS7eIiB0LHmM_ww7bPta35GDarC5bS8PVy0r-YJzVL5KXs-rMlHDZ6-RoYEO4F_Kzqizxy5G9KnNoJo1WZjSV8aTh4yevEAL'
};
