import React from 'react';
import { formatWeekday, formatFullDate } from '../../utils/dateFormatters';

interface DateDisplayProps {
  date?: Date;
  className?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ 
  date = new Date(),
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-lg font-semibold text-gray-900">
        {formatWeekday(date)}
      </span>
      <span className="text-sm text-surface-400">
        {formatFullDate(date)}
      </span>
    </div>
  );
};