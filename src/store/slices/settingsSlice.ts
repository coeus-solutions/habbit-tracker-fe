import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppearanceSettings {
  fontSize: 'small' | 'medium' | 'large';
}

interface SettingsState {
  darkMode: boolean;
  compactView: boolean;
  notificationsEnabled: boolean;
  appearance: AppearanceSettings;
}

const initialState: SettingsState = {
  darkMode: false,
  compactView: false,
  notificationsEnabled: true,
  appearance: {
    fontSize: 'medium',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleCompactView: (state) => {
      state.compactView = !state.compactView;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
    updateAppearance: (state, action: PayloadAction<Partial<AppearanceSettings>>) => {
      state.appearance = { ...state.appearance, ...action.payload };
    },
  },
});

export const {
  toggleDarkMode,
  toggleCompactView,
  toggleNotifications,
  updateSettings,
  updateAppearance,
} = settingsSlice.actions;

export default settingsSlice.reducer; 