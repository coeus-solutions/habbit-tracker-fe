import Dexie, { Table } from 'dexie';
import { Habit, HabitEntry, Category } from '../types/habit';

export class HabitDatabase extends Dexie {
  habits!: Table<Habit>;
  entries!: Table<HabitEntry>;
  categories!: Table<Category>;

  constructor() {
    super('HabitTrackerDB');
    
    this.version(1).stores({
      habits: '++id, name, category, isArchived',
      entries: '++id, habitId, date',
      categories: '++id, name'
    });
  }
}

export const db = new HabitDatabase();