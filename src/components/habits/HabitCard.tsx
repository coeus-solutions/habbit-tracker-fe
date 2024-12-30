import React, { useState } from 'react';
import { CheckCircleIcon, FireIcon, TrashIcon, ChevronDownIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';
import { Habit } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Text, SmallText } from '../ui/Typography';
import { HabitCalendar } from '../calendar/HabitCalendar';
import { useHabitCompletion } from '../../hooks/useHabitCompletion';
import { deleteHabit } from '../../store/slices/habitsSlice';

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const { isHabitCompletedToday, toggleHabitCompletion } = useHabitCompletion();
  const isCompleted = isHabitCompletedToday(habit.id);

  const handleToggle = () => {
    toggleHabitCompletion(habit.id, new Date());
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteHabit(habit.id)).unwrap();
      } catch (error) {
        console.error('Failed to delete habit:', error);
        alert('Failed to delete habit. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const toggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggle}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300 transform group-hover:scale-105
                ${isCompleted 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
              `}
            >
              <div className="relative w-6 h-6">
                {isCompleted ? (
                  <CheckCircleSolidIcon className="absolute inset-0 w-full h-full" />
                ) : (
                  <CheckCircleIcon className="absolute inset-0 w-full h-full" />
                )}
              </div>
            </button>
            <div>
              <Text className="text-xl font-semibold text-gray-900">{habit.name}</Text>
              <div className="flex items-center mt-1 space-x-3">
                <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
                  {habit.category}
                </span>
                {/* Current Streak */}
                <div className="flex items-center text-gray-500">
                  <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
                  <span>{habit.streak_count} day{habit.streak_count !== 1 ? 's' : ''}</span>
                </div>
                {/* Longest Streak */}
                {habit.longest_streak > 0 && (
                  <div className="flex items-center text-gray-500">
                    <TrophyIcon className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>Best: {habit.longest_streak}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleCalendar}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ChevronDownIcon 
                className={`w-5 h-5 transform transition-transform duration-200 ${isCalendarExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description */}
        {habit.description && (
          <p className="text-gray-600 mb-6">{habit.description}</p>
        )}

        {/* Calendar Section */}
        {isCalendarExpanded && (
          <div className="border-t pt-6">
            <HabitCalendar habitId={habit.id} />
          </div>
        )}
      </div>
    </div>
  );
};