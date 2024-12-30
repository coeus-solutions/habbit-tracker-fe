import React from 'react';
import { useFontSize } from '../../hooks/useFontSize';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<TypographyProps> = ({ children, className = '' }) => {
  const { getFontSizeClass } = useFontSize();
  return (
    <h2 className={`${getFontSizeClass('heading')} font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export const Text: React.FC<TypographyProps> = ({ children, className = '' }) => {
  const { getFontSizeClass } = useFontSize();
  return (
    <p className={`${getFontSizeClass('base')} ${className}`}>
      {children}
    </p>
  );
};

export const SmallText: React.FC<TypographyProps> = ({ children, className = '' }) => {
  const { getFontSizeClass } = useFontSize();
  return (
    <p className={`${getFontSizeClass('small')} ${className}`}>
      {children}
    </p>
  );
};