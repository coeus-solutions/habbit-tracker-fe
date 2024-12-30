import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateSettings, toggleDarkMode, toggleCompactMode, toggleNotifications } from '../store/settingsSlice';

export const useSettings = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const updateSettingsConfig = (newSettings: Partial<typeof settings>) => {
    dispatch(updateSettings(newSettings));
  };

  return {
    settings,
    updateSettings: updateSettingsConfig,
    toggleDarkMode: () => dispatch(toggleDarkMode()),
    toggleCompactMode: () => dispatch(toggleCompactMode()),
    toggleNotifications: () => dispatch(toggleNotifications()),
  };
};