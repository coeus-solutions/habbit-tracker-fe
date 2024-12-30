import { subDays, format } from 'date-fns';

// Generate last 30 days of completion data
export const generateDummyCompletionData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      completionRate: Math.floor(Math.random() * 40 + 60), // 60-100%
      totalHabits: 5,
      completedHabits: Math.floor(Math.random() * 3 + 2), // 2-5
    });
  }
  
  return data;
};

export const dummyStreakData = {
  currentStreak: 7,
  longestStreak: 14,
  totalCompletions: 127,
  averageCompletionRate: 85,
};

export const dummyHabitStats = [
  { name: 'Exercise', completionRate: 90, streak: 12, category: 'Health' },
  { name: 'Reading', completionRate: 75, streak: 5, category: 'Learning' },
  { name: 'Meditation', completionRate: 85, streak: 8, category: 'Mindfulness' },
  { name: 'Journaling', completionRate: 70, streak: 4, category: 'Creativity' },
];