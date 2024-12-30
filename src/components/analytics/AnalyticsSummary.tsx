import React, { useEffect, useState } from 'react';
import { FireIcon, CheckCircleIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { habitsApi } from '../../utils/api';

const StatCard = ({ title, value, icon: Icon, color }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white rounded-xl p-4 shadow-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-surface-400 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export const AnalyticsSummary = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{
    total_habits: number;
    total_entries: number;
    active_habits: number;
    current_streak: number;
    longest_streak: number;
  } | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await habitsApi.getAnalyticsSummary();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-card animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate success rate based on active habits and total entries
  const successRate = analytics?.active_habits && analytics.active_habits > 0
    ? Math.round((analytics.total_entries / (analytics.active_habits * 30)) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        title="Current Streak"
        value={`${analytics?.current_streak || 0} days`}
        icon={FireIcon}
        color="bg-primary-500"
      />
      <StatCard
        title="Longest Streak"
        value={`${analytics?.longest_streak || 0} days`}
        icon={SparklesIcon}
        color="bg-accent-purple"
      />
      <StatCard
        title="Total Completions"
        value={analytics?.total_entries || 0}
        icon={CheckCircleIcon}
        color="bg-accent-green"
      />
      <StatCard
        title="Success Rate"
        value={`${successRate}%`}
        icon={ChartBarIcon}
        color="bg-accent-yellow"
      />
    </div>
  );
};