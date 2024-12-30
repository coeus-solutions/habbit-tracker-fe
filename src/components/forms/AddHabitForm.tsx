import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHabit, updateHabit } from '../../store/habitSlice';
import { db } from '../../db/database';
import { v4 as uuidv4 } from 'uuid';
import { ColorPicker } from './ColorPicker';
import type { Habit } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';

interface AddHabitFormProps {
  habit?: Habit;
}

export const AddHabitForm: React.FC<AddHabitFormProps> = ({ habit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState(habit?.name ?? '');
  const [category, setCategory] = useState(habit?.category ?? '');
  const [color, setColor] = useState(habit?.color ?? '#3B82F6');
  const [description, setDescription] = useState(habit?.description ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (habit) {
      const updatedHabit = {
        ...habit,
        name,
        category,
        color,
        description,
      };

      try {
        await db.habits.update(habit.id, updatedHabit);
        dispatch(updateHabit({ id: habit.id, data: updatedHabit }));
        navigate('/');
      } catch (error) {
        console.error('Error updating habit:', error);
      }
    } else {
      const newHabit: Habit = {
        id: uuidv4(),
        name,
        category,
        color,
        description,
        created_at: new Date().toISOString(),
        is_archived: false,
        streak_count: 0,
        longest_streak: 0,
        user_id: '1',
      };

      try {
        await db.habits.add(newHabit);
        dispatch(createHabit(newHabit));
        navigate('/');
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Habit Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Read for 30 minutes"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Health, Learning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <ColorPicker color={color} onChange={setColor} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Add some details about your habit..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {habit ? 'Update Habit' : 'Add Habit'}
        </button>
      </div>
    </form>
  );
};