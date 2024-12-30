import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useFontSize = () => {
  const fontSize = useSelector((state: RootState) => state.settings.appearance.fontSize);
  
  const getFontSizeClass = (type: 'base' | 'heading' | 'small'): string => {
    switch (fontSize) {
      case 'small':
        return type === 'base' ? 'text-sm' : type === 'heading' ? 'text-lg' : 'text-xs';
      case 'large':
        return type === 'base' ? 'text-lg' : type === 'heading' ? 'text-2xl' : 'text-base';
      default: // medium
        return type === 'base' ? 'text-base' : type === 'heading' ? 'text-xl' : 'text-sm';
    }
  };

  return { getFontSizeClass };
};