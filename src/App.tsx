import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute>
      <div>
        <Header />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}

export default App;