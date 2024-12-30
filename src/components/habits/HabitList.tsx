
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  categoryFilter: string;
}

export const HabitList: React.FC<HabitListProps> = ({ categoryFilter }) => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  
  const filteredHabits = categoryFilter === 'all'
    ? habits
    : habits.filter(habit => habit.category === categoryFilter);

  if (filteredHabits.length === 0) {
    return (
      <div className="text-center py-8 text-surface-400">
        {habits.length === 0 ? "No habits added yet" : "No habits in this category"}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
};