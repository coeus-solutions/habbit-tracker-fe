export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'health',
    name: 'Health',
    icon: '💪',
    color: '#10B981',
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: '📚',
    color: '#3B82F6',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: '#F59E0B',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    icon: '🧘',
    color: '#8B5CF6',
  },
  {
    id: 'creativity',
    name: 'Creativity',
    icon: '🎨',
    color: '#EC4899',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    color: '#059669',
  },
];