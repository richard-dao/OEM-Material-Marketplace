import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import GlobalStyle from './GlobalStyles';
import LandingPage from './components/LandingPage';
import LandingCards from './components/LandingCards';
/* import LoginModal from './components/LoginScreen';*/

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <div>
          <NavigationBar onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
          <Routes>
            {isLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/buy" element={<Buy />} />
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<LandingPage onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn}/>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
          </Routes>
          {!isLoggedIn && <LandingCards />}
        </div>
      </Router>
    </>
  );
}

export default App;
