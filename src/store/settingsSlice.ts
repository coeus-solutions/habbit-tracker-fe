import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  darkMode: boolean;
  compactMode: boolean;
  notificationsEnabled: boolean;
}

const initialState: SettingsState = {
  darkMode: false,
  compactMode: false,
  notificationsEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  toggleDarkMode,
  toggleCompactMode,
  toggleNotifications,
  updateSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;