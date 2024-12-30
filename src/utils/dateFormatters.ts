import { format } from 'date-fns';

export const formatWeekday = (date: Date): string => {
  return format(date, 'EEEE');
};

export const formatFullDate = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};