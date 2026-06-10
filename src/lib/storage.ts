import { Lead, ChatRequest, Analytics } from '../types';

const LEADS_KEY = 'spaya_leads';
const CHAT_REQUESTS_KEY = 'spaya_chat_requests';
const ANALYTICS_KEY = 'spaya_analytics';
const HAS_VISITED_KEY = 'spaya_has_visited';

export const storage = {
  getLeads: (): Lead[] => {
    try {
      return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
    } catch {
      return [];
    }
  },
  saveLead: (lead: Omit<Lead, 'id' | 'date'>) => {
    const leads = storage.getLeads();
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    localStorage.setItem(LEADS_KEY, JSON.stringify([...leads, newLead]));
    return newLead;
  },
  getChatRequests: (): ChatRequest[] => {
    try {
      return JSON.parse(localStorage.getItem(CHAT_REQUESTS_KEY) || '[]');
    } catch {
      return [];
    }
  },
  saveChatRequest: (req: Omit<ChatRequest, 'id' | 'date'>) => {
    const requests = storage.getChatRequests();
    const newReq: ChatRequest = {
      ...req,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    localStorage.setItem(CHAT_REQUESTS_KEY, JSON.stringify([...requests, newReq]));
    return newReq;
  },
  getAnalytics: (): Analytics => {
    try {
      return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '{"visitors": 0}');
    } catch {
      return { visitors: 0 };
    }
  },
  incrementVisitor: () => {
    const current = storage.getAnalytics();
    current.visitors += 1;
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
  },
  hasVisited: (): boolean => {
    return localStorage.getItem(HAS_VISITED_KEY) === 'true';
  },
  setVisited: () => {
    localStorage.setItem(HAS_VISITED_KEY, 'true');
  },
  clearAll: () => {
    localStorage.removeItem(LEADS_KEY);
    localStorage.removeItem(CHAT_REQUESTS_KEY);
    localStorage.removeItem(HAS_VISITED_KEY);
  }
};

export const mailtoLink = "mailto:sivanshdubey69@gmail.com";
export const whatsappLink = "https://wa.me/919450070987";
export const companyPhone = "9450070987";
