
import { Switch } from '../ui/Switch';

export const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Daily Reminders</h3>
            <p className="text-sm text-gray-500">Get reminded of your habits each day</p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Weekly Summary</h3>
            <p className="text-sm text-gray-500">Receive a weekly progress report</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};