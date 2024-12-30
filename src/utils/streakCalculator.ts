interface HabitCompletion {
  date: string;
  created_at: string;
  habit_id: string;
  id: string;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isSameDay = (date1: string, date2: string): boolean => {
  return date1 === date2;
};

const isConsecutiveDay = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

export const calculateStreak = (completions: HabitCompletion[]): number => {
  if (!completions || completions.length === 0) return 0;

  // Sort completions by date in descending order
  const sortedCompletions = [...completions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = formatDate(new Date());
  let currentStreak = 0;
  let lastDate = today;

  // Check if we have a completion today
  const hasCompletionToday = sortedCompletions.some(c => isSameDay(c.date, today));
  
  if (!hasCompletionToday) {
    // If no completion today, check yesterday
    const yesterday = formatDate(new Date(Date.now() - 86400000));
    if (!sortedCompletions.some(c => isSameDay(c.date, yesterday))) {
      return 0;
    }
    lastDate = yesterday;
  }

  // Count consecutive days
  for (let i = 0; i < sortedCompletions.length; i++) {
    const currentDate = sortedCompletions[i].date;
    
    if (i === 0) {
      if (isSameDay(currentDate, lastDate)) {
        currentStreak = 1;
        continue;
      }
      break;
    }

    const prevDate = sortedCompletions[i - 1].date;
    if (isConsecutiveDay(currentDate, prevDate)) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
};

export const getStreakDisplay = (streak: number): string => {
  return `${streak} days`;
};

export const shouldShowFireIcon = (streak: number): boolean => {
  return streak > 0;
}; 