
import { AnimatedContainer } from '../ui/motion/AnimatedContainer';

interface SettingSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <AnimatedContainer className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="border-l-4 border-primary-500 pl-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-surface-400 mt-1">{description}</p>
      </div>
      {children}
    </AnimatedContainer>
  );
};