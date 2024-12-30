import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, logout } from '../store/slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import type { SignInRequest } from '../types/api';

// Update SignUpRequest to match SignUpData
export interface SignUpRequest {
  email: string;
  password: string;
  full_name: string;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticated = !!token;

  const handleSignIn = useCallback(
    async (credentials: SignInRequest) => {
      try {
        await dispatch(signIn(credentials)).unwrap();
        navigate('/'); // Redirect to dashboard after successful login
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch, navigate]
  );

  const handleSignUp = useCallback(
    async (userData: SignUpRequest) => {
      try {
        await dispatch(signUp(userData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuthenticated,
    loading,
    error,
    token,
    signIn: handleSignIn,
    signUp: handleSignUp,
    logout: handleLogout,
  };
}; 