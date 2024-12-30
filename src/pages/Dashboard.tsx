import React from 'react';
import { Header } from '../components/layout/Header';
import { AnalyticsSummary } from '../components/analytics/AnalyticsSummary';
import { QuickAddHabit } from '../components/habits/QuickAddHabit';
import { DashboardActions } from '../components/dashboard/DashboardActions';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-w-[400px] min-h-[500px] bg-surface-50">
      <Header />
      <main className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <QuickAddHabit />
        </div>

        <AnalyticsSummary />
        <DashboardActions />
      </main>
    </div>
  );
};