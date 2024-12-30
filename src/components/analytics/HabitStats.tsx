import React, { useEffect, useState } from 'react';
import { habitsApi, HabitPerformance } from '../../utils/api';

export const HabitStats = () => {
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState<HabitPerformance[]>([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const data = await habitsApi.getHabitPerformance();
        setPerformance(data);
      } catch (error) {
        console.error('Failed to fetch habit performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-card p-4">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (performance.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-card p-4">
        <h3 className="text-lg font-semibold mb-4">Habit Performance</h3>
        <p className="text-surface-400 text-center py-4">No habits to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <h3 className="text-lg font-semibold mb-4">Habit Performance</h3>
      <div className="space-y-4">
        {performance.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{habit.name}</p>
              <p className="text-sm text-surface-400">{habit.category}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{habit.completion_rate}%</p>
                <p className="text-xs text-surface-400">Success Rate</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{habit.streak_count} days</p>
                <p className="text-xs text-surface-400">Current Streak</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{habit.longest_streak} days</p>
                <p className="text-xs text-surface-400">Best Streak</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};