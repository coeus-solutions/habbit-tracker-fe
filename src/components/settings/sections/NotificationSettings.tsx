
import { Switch } from '../../ui/Switch';
import { useSettings } from '../../../hooks/useSettings';

export const NotificationSettings: React.FC = () => {
  const { settings, toggleNotifications } = useSettings();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Enable Notifications</h3>
            <p className="text-sm text-gray-500">Receive reminders and updates</p>
          </div>
          <Switch
            checked={settings.notificationsEnabled}
            onChange={() => toggleNotifications()}
          />
        </div>
      </div>
    </div>
  );
};