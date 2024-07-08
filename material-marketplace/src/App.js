// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import GlobalStyle from './GlobalStyles';
import LandingCards from './components/LandingCards';
import ChatBot from './components/Chatbot';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
// import LoginModal from './components/LoginScreen'; // Import the LoginModal

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false); // Close the modal upon successful login
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastPath');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleAttemptAccess = () => {
    // Show the login modal if the user is not logged in
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Router>
          <NavigationBar onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <AppRoutes isLoggedIn={isLoggedIn} handleLoginSuccess={handleLoginSuccess} onAttemptAccess={handleAttemptAccess} />
          {!isLoggedIn && <LandingCards onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>}
      </Router>
      <ChatBot />
      <Footer />
    </>
  );
}

export default App;
