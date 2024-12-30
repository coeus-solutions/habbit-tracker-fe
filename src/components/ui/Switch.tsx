import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  size = 'md',
}) => {
  const sizes = {
    sm: {
      switch: 'w-8 h-5',
      thumb: 'w-3.5 h-3.5',
      translate: 'translate-x-3.5',
    },
    md: {
      switch: 'w-11 h-6',
      thumb: 'w-4 h-4',
      translate: 'translate-x-5',
    },
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`
        relative inline-flex ${sizes[size].switch} flex-shrink-0 items-center rounded-full
        ${checked ? 'bg-primary-500' : 'bg-surface-200'}
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      `}
    >
      <motion.span
        layout
        className={`
          ${sizes[size].thumb}
          ${checked ? sizes[size].translate : 'translate-x-1'}
          rounded-full bg-white shadow-sm
          transition duration-200 ease-in-out
        `}
      />
    </button>
  );
};