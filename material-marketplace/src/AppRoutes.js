// AppRoutes.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Help from './pages/Help';
import LandingPage from './components/LandingPage';
import { Nav } from 'react-bootstrap';

const AppRoutes = ({ isLoggedIn, handleLoginSuccess, onAttemptAccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate to the last visited path after login
  useEffect(() => {
    if (isLoggedIn) {
      const lastPath = localStorage.getItem('lastPath');
      if (lastPath && location.pathname === '/') {
        navigate(lastPath, { replace: true });
      }
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // Save the current path to local storage when it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location.pathname, isLoggedIn]);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LandingPage onLoginSuccess={handleLoginSuccess} />} />
          {/* Trigger login modal on restricted access */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/buy" element={<Navigate to="/" replace />} />
          <Route path="/sell" element={<Navigate to="/" replace />} />
          <Route path="/cart" element={<Navigate to="/" replace />} />
          <Route path="/account" element={<Navigate to="/" replace />} />
          <Route path="/help" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
