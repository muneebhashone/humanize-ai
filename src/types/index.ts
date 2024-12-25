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
export interface Agent {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  calls_today: number;
  success_rate: string;
  avg_duration: string;
  avatar: string;
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