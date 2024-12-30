import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { habitsApi, CreateHabitData } from '../utils/api';

interface HabitEntry {
  id: string;
  habit_id: string;
  completed_at: string;
}

interface Habit {
  id: string;
  name: string;
  category: string;
  color: string;
  description?: string;
  created_at: string;
  is_archived: boolean;
  streak_count: number;
  longest_streak: number;
  entries?: HabitEntry[];
}

interface HabitState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  loading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk<Habit[]>(
  'habits/fetchHabits',
  async () => {
    const response = await habitsApi.getHabits();
    return response as Habit[];
  }
);

export const createHabit = createAsyncThunk<Habit, CreateHabitData>(
  'habits/createHabit',
  async (data: CreateHabitData) => {
    const response = await habitsApi.createHabit(data);
    return response as Habit;
  }
);

export const updateHabit = createAsyncThunk<Habit, { id: string; data: Partial<CreateHabitData> }>(
  'habits/updateHabit',
  async ({ id, data }) => {
    const response = await habitsApi.updateHabit(id, data);
    return response as Habit;
  }
);

export const deleteHabit = createAsyncThunk<string, string>(
  'habits/deleteHabit',
  async (id: string) => {
    await habitsApi.deleteHabit(id);
    return id;
  }
);

export const addEntry = createAsyncThunk<
  { habitId: string; entry: HabitEntry },
  { habitId: string; date: string }
>(
  'habits/addEntry',
  async ({ habitId, date }) => {
    const response = await habitsApi.createHabitEntry(habitId, date);
    return { habitId, entry: response as HabitEntry };
  }
);

export const fetchEntries = createAsyncThunk<
  { habitId: string; entries: HabitEntry[] },
  { habitId: string; startDate?: string; endDate?: string }
>(
  'habits/fetchEntries',
  async ({ habitId, startDate, endDate }) => {
    const response = await habitsApi.getHabitEntries(habitId, startDate, endDate);
    return { habitId, entries: response as HabitEntry[] };
  }
);

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch habits
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch habits';
      })
      // Create habit
      .addCase(createHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.habits.push(action.payload);
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create habit';
      })
      // Update habit
      .addCase(updateHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.habits.findIndex(h => h.id === action.payload.id);
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(updateHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update habit';
      })
      // Delete habit
      .addCase(deleteHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = state.habits.filter(h => h.id !== action.payload);
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete habit';
      })
      // Add entry
      .addCase(addEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.loading = false;
        const habit = state.habits.find(h => h.id === action.payload.habitId);
        if (habit) {
          if (!habit.entries) {
            habit.entries = [];
          }
          habit.entries.push(action.payload.entry);
        }
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add habit entry';
      })
      // Fetch entries
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        const habit = state.habits.find(h => h.id === action.payload.habitId);
        if (habit) {
          habit.entries = action.payload.entries;
        }
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch habit entries';
      });
  },
});

export default habitSlice.reducer;