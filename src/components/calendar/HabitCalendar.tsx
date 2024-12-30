import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';
import { useHabitCompletion } from '../../hooks/useHabitCompletion';

interface HabitCalendarProps {
  habitId: string;
}

export const HabitCalendar: React.FC<HabitCalendarProps> = ({ habitId }) => {
  const { toggleHabitCompletion } = useHabitCompletion();
  const completions = useSelector((state: RootState) => 
    state.habits.completions[habitId] || []
  );

  // Generate dates for the last 7 days
  const getDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const isDateCompleted = (date: Date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    return completions.some(completion => completion.date === dateStr);
  };

  const handleDateClick = (date: Date) => {
    toggleHabitCompletion(habitId, date);
  };

  return (
    <div className="flex justify-between items-center">
      {getDates().map((date) => (
        <div key={date.toISOString()} className="flex flex-col items-center">
          <div className="text-sm text-gray-500 mb-2">
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <button
            onClick={() => handleDateClick(date)}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              transition-all duration-300 transform hover:scale-105
              ${isDateCompleted(date)
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
            `}
          >
            <div className="relative w-6 h-6">
              {isDateCompleted(date) ? (
                <CheckCircleSolidIcon className="absolute inset-0 w-full h-full" />
              ) : (
                <CheckCircleIcon className="absolute inset-0 w-full h-full" />
              )}
            </div>
          </button>
          <div className="text-sm text-gray-500 mt-2">
            {date.getDate()}
          </div>
        </div>
      ))}
    </div>
  );
};