import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className="relative">
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          pl-9 pr-3 py-2
          border border-surface-200 rounded-lg
          text-sm text-gray-900
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${className}
        `}
      />
      <ClockIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
    </div>
  );
};