export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  businessType?: string;
  source: string;
  date: string;
}

export interface ChatRequest {
  id: string;
  userName?: string;
  userPhone?: string;
  botType: string;
  requestType: string;
  details: string;
  date: string;
}

export interface Analytics {
  visitors: number;
}
