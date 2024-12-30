import React from 'react';
import { Switch } from '../../ui/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { toggleDarkMode, toggleCompactMode } from '../../../store/settingsSlice';

export const AppearanceSettings: React.FC = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Appearance</h2>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
            <p className="text-sm text-gray-500">Use dark theme</p>
          </div>
          <Switch
            checked={settings.darkMode}
            onChange={() => dispatch(toggleDarkMode())}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Compact Mode</h3>
            <p className="text-sm text-gray-500">Show habits in a condensed format</p>
          </div>
          <Switch
            checked={settings.compactMode}
            onChange={() => dispatch(toggleCompactMode())}
          />
        </div>
      </div>
    </div>
  );
};