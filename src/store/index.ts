import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import habitsReducer from './habitSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 