
import { Logo } from './Logo';
import { DateDisplay } from './DateDisplay';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChartBarIcon, CalendarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store';

export const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm mb-6 p-4 border-b">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <Logo />
          </Link>
          <DateDisplay />
        </div>
        <nav className="flex items-center space-x-2">
          <Link
            to="/track"
            className={`p-2 rounded-full hover:bg-surface-100 ${
              location.pathname === '/track' 
                ? 'text-primary-500 bg-primary-50' 
                : 'text-surface-400 hover:text-surface-500'
            }`}
            title="Track Habits"
          >
            <CalendarIcon className="w-5 h-5" />
          </Link>
          <Link
            to="/analytics"
            className={`p-2 rounded-full hover:bg-surface-100 ${
              location.pathname === '/analytics' 
                ? 'text-primary-500 bg-primary-50' 
                : 'text-surface-400 hover:text-surface-500'
            }`}
            title="Analytics"
          >
            <ChartBarIcon className="w-5 h-5" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-surface-100 text-surface-400 hover:text-surface-500"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </header>
  );
};