import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Button } from '../../ui/Button';

export const DataSettings: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);

  const handleExportData = () => {
    const data = {
      habits,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habit-tracker-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Data Management</h2>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
          <p className="text-sm text-gray-500 mb-2">
            Download your habit data as a JSON file
          </p>
          <Button
            variant="secondary"
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};