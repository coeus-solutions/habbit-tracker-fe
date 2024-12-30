export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: string;
  created_at: string;
  color: string;
  is_archived: boolean;
  streak_count: number;
  longest_streak: number;
  user_id: string;
  entries?: HabitEntry[];
}

export interface HabitEntry {
  id: string;
  habit_id: string;
  completed_at: string;
  date: string;
  notes?: string;
  synced: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}