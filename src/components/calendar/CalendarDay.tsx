
import { format, isToday } from 'date-fns';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CalendarDayProps {
  date: Date;
  isCompleted: boolean;
  onToggle: () => void;
  isDisabled: boolean;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCompleted,
  onToggle,
  isDisabled,
}) => {
  const dayName = format(date, 'EEE');
  const dayNumber = format(date, 'd');
  const isTodayDate = isToday(date);

  return (
    <button
      onClick={onToggle}
      disabled={isDisabled}
      className={`
        relative w-10 h-10 rounded-full flex items-center justify-center
        transition-all duration-200
        ${isDisabled 
          ? 'cursor-not-allowed opacity-50' 
          : isCompleted
            ? 'bg-green-50 text-green-600 hover:bg-green-100'
            : 'hover:bg-gray-100'
        }
        ${isTodayDate ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
    >
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium text-gray-500 mb-0.5">{dayName}</span>
        <span className={`text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-gray-900'}`}>
          {dayNumber}
        </span>
      </div>
      {isCompleted && (
        <CheckIcon className="absolute top-0 right-0 w-3.5 h-3.5 text-green-500" />
      )}
    </button>
  );
};