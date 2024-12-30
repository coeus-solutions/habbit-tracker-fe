export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: string;
  createdAt: string; // Changed to string for Redux store
  reminderTime?: string;
  color: string;
  isArchived: boolean;
  streakCount: number;
  longestStreak: number;
  lastCompleted?: string; // Changed to string for Redux store
}

export interface HabitEntry {
  id: string;
  habitId: string;
  completedAt: string; // Changed to string for Redux store
  date: string; // Changed to string for Redux store
  notes?: string;
  synced: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}