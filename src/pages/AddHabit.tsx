
import { Header } from '../components/layout/Header';
import { AddHabitForm } from '../components/forms/AddHabitForm';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const AddHabit: React.FC = () => {
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
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Add New Habit</h1>
        <AddHabitForm />
      </main>
    </div>
  );
};