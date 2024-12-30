import axios from 'axios';
import { CreateHabitData } from '../types/api';

export interface Habit {
  id: string;
  name: string;
  category: string;
  color: string;
  description?: string;
  is_archived: boolean;
  created_at: string;
  user_id: string;
  streak_count: number;
  longest_streak: number;
}

export interface HabitEntry {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  created_at: string;
  streak_count: number;
  longest_streak: number;
}

export interface HabitPerformance {
  id: string;
  name: string;
  category: string;
  completion_rate: number;
  streak_count: number;
  longest_streak: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const habitsApi = {
  getHabits: async () => {
    const response = await api.get<Habit[]>('/habits');
    return response.data;
  },

  createHabit: async (data: CreateHabitData) => {
    const response = await api.post<Habit>('/habits', data);
    return response.data;
  },

  updateHabit: async (id: string, data: Partial<CreateHabitData>) => {
    const response = await api.put<Habit>(`/habits/${id}`, data);
    return response.data;
  },

  deleteHabit: async (id: string) => {
    try {
      const response = await api.delete(`/habits/${id}`);
      console.log('Delete response:', response);
      return id;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },

  createHabitEntry: async (habitId: string, date: string) => {
    const response = await api.post<HabitEntry>(`/habits/${habitId}/entries`, { date });
    return response.data;
  },

  getHabitEntries: async (habitId: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const response = await api.get(`/habits/${habitId}/entries?${params.toString()}`);
    return response.data;
  },

  getAnalyticsSummary: async () => {
    const response = await api.get<{
      total_habits: number;
      total_entries: number;
      active_habits: number;
      current_streak: number;
      longest_streak: number;
    }>('/analytics/summary');
    return response.data;
  },

  getHabitPerformance: async () => {
    const response = await api.get<HabitPerformance[]>('/analytics/performance');
    return response.data;
  }
};

export default api; 