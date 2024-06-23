import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import GlobalStyle from './GlobalStyles';
import LandingPage from './components/LandingPage';
import LandingCards from './components/LandingCards';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          {/* Handle some sort of login logic */}
          {/* If user is logged in, allow for other pages to be shown, else show only LandingPage and LandingCards */}
          <LandingPage />
          <LandingCards />
        </div>
      </Router>
    </>
  );
}

export default App;
