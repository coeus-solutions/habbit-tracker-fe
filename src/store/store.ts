import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import habitsReducer from './slices/habitsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    habits: habitsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;