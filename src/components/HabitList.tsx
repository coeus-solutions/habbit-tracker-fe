import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { format } from 'date-fns';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export const HabitList: React.FC = () => {
  const { habits, entries } = useSelector((state: RootState) => state.habits);
  const today = new Date();

  const isHabitCompletedToday = (habitId: string) => {
    return entries.some(entry => 
      entry.habitId === habitId && 
      format(entry.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Today's Habits</h2>
      {habits.filter(habit => !habit.isArchived).map(habit => (
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
              Streak: {habit.streakCount} days
            </span>
            {isHabitCompletedToday(habit.id) ? (
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