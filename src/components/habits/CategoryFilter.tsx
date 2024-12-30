import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  AcademicCapIcon,
  HeartIcon,
  HomeIcon,
  BriefcaseIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface CategoryOption {
  value: string;
  label: string;
  icon: React.ForwardRefExoticComponent<any>;
}

const categories: CategoryOption[] = [
  { value: 'all', label: 'All Categories', icon: SparklesIcon },
  { value: 'health', label: 'Health', icon: HeartIcon },
  { value: 'work', label: 'Work', icon: BriefcaseIcon },
  { value: 'education', label: 'Education', icon: AcademicCapIcon },
  { value: 'home', label: 'Home', icon: HomeIcon },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory) || categories[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-between w-48 px-4 py-2 text-sm font-medium text-surface-700 bg-white border border-surface-300 rounded-lg hover:bg-surface-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
        <div className="flex items-center">
          {React.createElement(selectedCategoryData.icon, {
            className: "w-5 h-5 mr-2 text-surface-500"
          })}
          <span>{selectedCategoryData.label}</span>
        </div>
        <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-surface-400" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items className="absolute left-0 z-10 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {categories.map((category) => (
            <Menu.Item key={category.value}>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={() => onCategoryChange(category.value)}
                  className={`${
                    active ? 'bg-surface-100 text-surface-900' : 'text-surface-700'
                  } group flex items-center w-full px-4 py-2 text-sm`}
                >
                  {React.createElement(category.icon, {
                    className: "w-5 h-5 mr-2 text-surface-500"
                  })}
                  {category.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}; 