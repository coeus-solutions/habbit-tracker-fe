import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { AnimatedContainer } from '../ui/motion/AnimatedContainer';

const ActionCard: React.FC<{
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ to, icon, title, description }) => (
  <Link to={to}>
    <AnimatedContainer className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-primary-50 rounded-lg text-primary-500">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-surface-400 mt-1">{description}</p>
        </div>
      </div>
    </AnimatedContainer>
  </Link>
);

export const DashboardActions: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ActionCard
        to="/track"
        icon={<CalendarIcon className="w-6 h-6" />}
        title="Track Habits"
        description="View and update your daily habits"
      />
      <ActionCard
        to="/analytics"
        icon={<ChartBarIcon className="w-6 h-6" />}
        title="Analytics"
        description="Check your progress and insights"
      />
    </div>
  );
};