import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { toggleHabitCompletion, fetchAllCompletions } from '../store/slices/habitsSlice';
import { format } from 'date-fns';

export const useHabitCompletion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const completions = useSelector((state: RootState) => state.habits.completions);
  const habits = useSelector((state: RootState) => state.habits.habits);
  const lastFetched = useSelector((state: RootState) => state.habits.lastFetchedCompletions);

  useEffect(() => {
    // Only fetch if we haven't fetched today or if we haven't fetched at all
    const shouldFetch = !lastFetched || 
      format(new Date(lastFetched), 'yyyy-MM-dd') !== format(new Date(), 'yyyy-MM-dd');

    if (shouldFetch && habits.length > 0) {
      dispatch(fetchAllCompletions());
    }
  }, [dispatch, habits, lastFetched]);

  const isHabitCompletedToday = (habitId: string): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return completions[habitId]?.some(completion => completion.date === today) ?? false;
  };

  const isHabitCompletedOnDate = (habitId: string, date: Date): boolean => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return completions[habitId]?.some(completion => completion.date === formattedDate) ?? false;
  };

  const handleToggleCompletion = async (habitId: string, date?: Date) => {
    try {
      if (date) {
        // If already completed on this date, do nothing (we don't support un-completing for now)
        if (isHabitCompletedOnDate(habitId, date)) {
          return;
        }
      }
      await dispatch(toggleHabitCompletion({ habitId, date })).unwrap();
    } catch (error) {
      console.error('Failed to toggle habit completion:', error);
    }
  };

  return {
    isHabitCompletedToday,
    isHabitCompletedOnDate,
    toggleHabitCompletion: handleToggleCompletion,
  };
};