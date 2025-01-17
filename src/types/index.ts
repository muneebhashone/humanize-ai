// Auth Types
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

// Agent Types
export interface CreateAgentData {
  name: string;
  email: string;
  persona: string;
  voip_no: string;
  dept: string;
  tools: string[];
  status: string;
  last_call?: string;
}

export interface Agent extends CreateAgentData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentFilters {
  status?: string;
  role?: string;
  search?: string;
}

// Call Types
export interface Call {
  id: string;
  phone_number: string;
  status: 'active' | 'completed' | 'failed';
  duration: number;
  agent_id: number;
  started_at: string;
  ended_at?: string;
}

// Analytics Types
export interface AnalyticsOverview {
  total_calls: number;
  active_calls: number;
  success_rate: number;
  avg_duration: number;
  agents_online: number;
}

export interface AgentPerformance {
  agent_id: number;
  calls_handled: number;
  success_rate: number;
  avg_duration: number;
  online_time: number;
} 