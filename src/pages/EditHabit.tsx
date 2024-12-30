import React from 'react';
import { Header } from '../components/layout/Header';
import { AddHabitForm } from '../components/forms/AddHabitForm';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const EditHabit: React.FC = () => {
  const { habitId } = useParams<{ habitId: string }>();
  const habit = useSelector((state: RootState) => 
    state.habits.habits.find(h => h.id === habitId)
  );

  if (!habit) {
    return <div>Habit not found</div>;
  }

  return (
    <div className="min-w-[400px] min-h-[500px] bg-gray-50">
      <Header />
      <main className="p-4">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Edit Habit</h1>
        <AddHabitForm habit={habit} />
      </main>
    </div>
  );
};