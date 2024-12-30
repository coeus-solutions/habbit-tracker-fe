import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { TrackHabits } from '../pages/TrackHabits';
import { Analytics } from '../pages/Analytics';
import { LoginForm } from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <SignupForm />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/track" replace />,
      },
      {
        path: '/track',
        element: <TrackHabits />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
    ],
  },
]);