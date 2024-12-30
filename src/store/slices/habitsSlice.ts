import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api, { habitsApi, Habit, HabitEntry } from '../../utils/api';
import { CreateHabitData } from '../../types/api';

interface HabitCompletion {
  id: string;
  habit_id: string;
  date: string;
  created_at: string;
}

interface HabitsState {
  habits: (Habit & { entries?: HabitEntry[] })[];
  completions: { [habitId: string]: HabitCompletion[] };
  loading: boolean;
  error: string | null;
  lastFetchedCompletions: string | null;
}

const initialState: HabitsState = {
  habits: [],
  completions: {},
  loading: false,
  error: null,
  lastFetchedCompletions: null,
};

export const fetchHabits = createAsyncThunk(
  'habits/fetchHabits',
  async () => {
    const response = await api.get<Habit[]>('/habits');
    return response.data;
  }
);

export const createHabit = createAsyncThunk<Habit, CreateHabitData>(
  'habits/createHabit',
  async (data: CreateHabitData) => {
    const response = await habitsApi.createHabit(data);
    return response;
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async (habitId: string) => {
    await habitsApi.deleteHabit(habitId);
    return habitId;
  }
);

interface ToggleCompletionPayload {
  habitId: string;
  date?: Date;
}

export const toggleHabitCompletion = createAsyncThunk(
  'habits/toggleCompletion',
  async ({ habitId, date }: ToggleCompletionPayload) => {
    const completionDate = date 
      ? date.toLocaleDateString('en-CA')
      : new Date().toLocaleDateString('en-CA');
    
    console.log('Toggling completion for habit', habitId, 'on date', completionDate);
    const response = await habitsApi.createHabitEntry(habitId, completionDate);
    console.log('Toggle response:', response);
    return { 
      habitId, 
      completion: {
        id: response.id,
        habit_id: response.habit_id,
        date: response.completed_at.split('T')[0],
        created_at: response.created_at
      },
      streak_count: response.streak_count,
      longest_streak: response.longest_streak
    };
  }
);

export const fetchAllCompletions = createAsyncThunk(
  'habits/fetchAllCompletions',
  async (_, { getState }) => {
    const state = getState() as { habits: HabitsState };
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30); // Get last 30 days of completions

    console.log('Fetching completions from', startDate, 'to', today);

    // Fetch completions for all habits in parallel
    const completionsPromises = state.habits.habits.map(habit =>
      habitsApi.getHabitEntries(
        habit.id,
        startDate.toISOString().split('T')[0],
        today.toISOString().split('T')[0]
      ).then(completions => {
        console.log(`Received completions for habit ${habit.id}:`, completions);
        return { habitId: habit.id, completions };
      })
    );

    const results = await Promise.all(completionsPromises);
    const completionsMap: { [habitId: string]: HabitCompletion[] } = {};
    
    results.forEach(({ habitId, completions }) => {
      completionsMap[habitId] = completions as HabitCompletion[];
    });

    console.log('Final completions map:', completionsMap);
    return completionsMap;
  }
);

export const addEntry = createAsyncThunk(
  'habits/addEntry',
  async ({ habitId, date }: { habitId: string; date: string }) => {
    const response = await habitsApi.createHabitEntry(habitId, date);
    return response;
  }
);

const habitsSlice = createSlice({
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
      .addCase(fetchHabits.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.habits = action.payload;
        state.loading = false;
        state.error = null;
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
        state.habits.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create habit';
      })
      // Delete habit
      .addCase(deleteHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(habit => habit.id !== action.payload);
        delete state.completions[action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete habit';
      })
      // Toggle completion
      .addCase(toggleHabitCompletion.fulfilled, (state, action) => {
        const { habitId, completion, streak_count, longest_streak } = action.payload;
        
        // Update habit streak information
        const habit = state.habits.find(h => h.id === habitId);
        if (habit) {
          habit.streak_count = streak_count;
          habit.longest_streak = longest_streak;
        }

        // Update completions
        if (!state.completions[habitId]) {
          state.completions[habitId] = [];
        }
        // Remove any existing completion for the same date
        state.completions[habitId] = state.completions[habitId].filter(
          c => c.date !== completion.date
        );
        state.completions[habitId].push(completion);
        console.log('Updated completions for habit', habitId, ':', state.completions[habitId]);
      })
      // Fetch all completions
      .addCase(fetchAllCompletions.fulfilled, (state, action) => {
        state.completions = action.payload;
        state.lastFetchedCompletions = new Date().toISOString();
        console.log('Updated all completions:', state.completions);
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.loading = false;
        const habit = state.habits.find(h => h.id === action.payload.habit_id);
        if (habit) {
          // Update streak information
          habit.streak_count = action.payload.streak_count;
          habit.longest_streak = action.payload.longest_streak;
          
          // Add to entries
          if (!habit.entries) {
            habit.entries = [];
          }
          habit.entries.push(action.payload);

          // Add to completions
          if (!state.completions[habit.id]) {
            state.completions[habit.id] = [];
          }
          state.completions[habit.id].push({
            id: action.payload.id,
            habit_id: action.payload.habit_id,
            date: action.payload.completed_at.split('T')[0], // Convert to YYYY-MM-DD format
            created_at: action.payload.completed_at
          });
        }
      });
  },
});

export default habitsSlice.reducer; 