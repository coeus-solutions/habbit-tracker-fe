import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { format } from 'date-fns';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Habit, HabitEntry } from '../utils/api';

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const today = new Date();

  const isHabitCompletedToday = (habit: Habit & { entries?: HabitEntry[] }) => {
    const todayStr = format(today, 'yyyy-MM-dd');
    return habit.entries?.some(entry => format(new Date(entry.completed_at), 'yyyy-MM-dd') === todayStr) ?? false;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Today's Habits</h2>
      {habits.filter(habit => !habit.is_archived).map(habit => (
        <div
          key={habit.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          style={{ borderLeft: `4px solid ${habit.color}` }}
        >
          <div>
            <h3 className="font-medium">{habit.name}</h3>
            <p className="text-sm text-gray-500">{habit.category}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Streak: {habit.streak_count} days
            </span>
            {isHabitCompletedToday(habit) ? (
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            ) : (
              <XCircleIcon className="w-8 h-8 text-gray-300" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { HabitList };