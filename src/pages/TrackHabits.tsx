import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HabitList } from '../components/habits/HabitList';
import { Link } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { QuickAddHabit } from '../components/habits/QuickAddHabit';
import { CategoryFilter } from '../components/habits/CategoryFilter';
import { fetchHabits, fetchAllCompletions } from '../store/slices/habitsSlice';
import { AppDispatch, RootState } from '../store/store';

export const TrackHabits: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, habits } = useSelector((state: RootState) => state.habits);
  const completions = useSelector((state: RootState) => state.habits.completions);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchHabits());
    dispatch(fetchAllCompletions());
  }, [dispatch]);

  // Calculate total habits completed today
  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    const filteredHabits = selectedCategory === 'all' 
      ? habits 
      : habits.filter(habit => habit.category === selectedCategory);
    const totalHabits = filteredHabits.length;
    const completedHabits = filteredHabits.filter(habit => 
      completions[habit.id]?.some(completion => completion.date === today)
    ).length;
    return { completedHabits, totalHabits };
  };

  const { completedHabits, totalHabits } = getTodayProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Track Habits</h1>
          </div>
          <QuickAddHabit />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Today's Progress</h2>
              <p className="text-gray-600">
                {completedHabits} of {totalHabits} habits completed
              </p>
            </div>
            <Link
              to="/analytics"
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
            >
              <ChartBarIcon className="h-5 w-5 mr-1" />
              View Analytics
            </Link>
          </div>
        </div>

        {/* Habits List */}
        {loading ? (
          <div className="text-center py-8">Loading habits...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : (
          <HabitList categoryFilter={selectedCategory} />
        )}
      </main>
    </div>
  );
};