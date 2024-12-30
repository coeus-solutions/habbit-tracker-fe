
import { Switch } from '../ui/Switch';

export const DisplaySettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Display</h2>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
            <p className="text-sm text-gray-500">Use dark theme</p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Compact View</h3>
            <p className="text-sm text-gray-500">Show habits in a condensed format</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};