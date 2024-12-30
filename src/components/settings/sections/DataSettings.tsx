import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { SettingSection } from '../SettingSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const DataSettings = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { habits, entries } = useSelector((state: RootState) => state.habits);
  const settings = useSelector((state: RootState) => state.settings);

  const handleExport = () => {
    setIsExporting(true);
    try {
      const data = {
        habits,
        entries,
        settings,
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `habitify-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <SettingSection
      title="Data & Privacy"
      description="Manage your data and privacy settings"
    >
      <div>
        <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
        <p className="text-sm text-surface-400 mb-2">Download all your habit data</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export as JSON'}
        </Button>
      </div>
    </SettingSection>
  );
};