import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AnalyticsSummary } from '../components/analytics/AnalyticsSummary';
import { HabitStats } from '../components/analytics/HabitStats';

export const Analytics: React.FC = () => {
  return (
    <div className="min-w-[400px] min-h-[500px] bg-surface-50">
      <main className="p-4">
        <div className="mb-6">
          <Link
            to="/track"
            className="inline-flex items-center text-sm text-surface-400 hover:text-surface-500"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Habits
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          
          <AnalyticsSummary />
          <HabitStats />
        </div>
      </main>
    </div>
  );
};