export type ScreenType =
  | 'landing'
  | 'login'
  | 'overview'
  | 'leads'
  | 'chats'
  | 'agents'
  | 'knowledge'
  | 'settings';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'unqualified';

export interface Lead {
  id: string;
  name: string;
  initials: string;
  company: string;
  email: string;
  phone: string;
  requirement: string;
  agent: string;
  status: LeadStatus;
  timestamp: string;
  consent: string;
  score?: number;
  notes?: { id: string; text: string; time: string }[];
}

export interface ConversationMessage {
  id: string;
  sender: 'user' | 'agent' | 'human';
  name: string;
  time: string;
  text: string;
  tag?: string;
  matchedKb?: string;
  deliveredToCrm?: boolean;
}

export interface ConversationSession {
  id: string;
  convNumber: string;
  visitorName: string;
  initials: string;
  location: string;
  browser: string;
  agentName: string;
  status: 'lead_captured' | 'resolved' | 'escalation';
  duration: string;
  timeAgo: string;
  snippet: string;
  hasLead: boolean;
  leadEmail?: string;
  messages: ConversationMessage[];
}

export interface AgentConfig {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'paused';
  chatsCount: number;
  leadsCount: number;
  convRate: string;
  persona: 'professional' | 'technical';
  greetingMessage: string;
  accentColor: string;
  widgetPosition: 'bottom-right' | 'bottom-left';
  requiredFields: {
    name: boolean;
    email: boolean;
    phone: boolean;
    company: boolean;
  };
  triggerCondition: string;
  knowledgeSources: { id: string; name: string; size: string; updated: string; type: 'pdf' | 'docx' }[];
  embedSnippet: string;
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv';
  size: string;
  uploadDate: string;
  status: 'ready' | 'processing' | 'failed';
  embeddingsCount?: number;
  decisionNodesCount?: number;
  progressPercent?: number;
  chunkInfo?: string;
  failureReason?: string;
}
