import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { AddHabitModal } from '../forms/AddHabitModal';
import { Button } from '../ui/Button';

export const QuickAddHabit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        icon={<PlusIcon className="h-4 w-4" />}
      >
        New Habit
      </Button>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};