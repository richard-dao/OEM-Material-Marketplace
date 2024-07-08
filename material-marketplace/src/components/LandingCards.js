import React, { useState } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
// import { GraphUp, Cart4, Cash } from 'bootstrap-icons';
import LoginModal from './LoginScreen';
import { useLocation } from 'react-router-dom';

const LandingCards = ( {onLoginSuccess, onLogout} ) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') && JSON.parse(localStorage.getItem('user'));

  const handleLoginModalClose = () => setShowLoginModal(false);
  const handleLoginModalShow = () => setShowLoginModal(true);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
  };

  const handleNavLinkClick = (path) => {
      if (!isLoggedIn) {
          setShowLoginModal(true); // Show login modal if not logged in
      } else {
          // Navigate to the clicked link path
          // You can add additional logic here if needed
      }
  };

  return (
    <>
    <Container className="mb-10" style={{marginTop: '4rem'}}>
      <h2 className="text-center">What We Offer</h2>
      <Row className="justify-content-center" style={{marginTop: '2rem'}}> {/* Replaced div with Row */}
        <Card className="col-lg-4 g-2 shadow" style={{ width: '18rem', marginLeft: '20px' }}> {/* Added g-2 for margin */}
          <Card.Body className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-graph-up mb-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
          </svg>
            <Card.Title>Dashboard</Card.Title>
            <Card.Text>
              Keep track of all your materials and profits using our custom made analytics tools
            </Card.Text>
            <Button variant="primary" onClick={() => handleNavLinkClick('/dashboard')}>Go to Your Dashboard</Button>
          </Card.Body>
        </Card>
        <Card className="col-lg-4 g-2 shadow" style={{ width: '18rem', marginLeft: '20px' }}> {/* Added g-2 for margin */}
          <Card.Body className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
          </svg>
            <Card.Title>Buy</Card.Title>
            <Card.Text>
              Seamlessly purchase materials from other company's excesses at lower prices
            </Card.Text>
            <Button variant="primary" onClick={() => handleNavLinkClick('/buy')}>Search the Marketplace</Button>
          </Card.Body>
        </Card>
        <Card className="col-lg-4 g-2 shadow" style={{ width: '18rem', marginLeft: '20px' }}> {/* Added g-2 for margin */}
          <Card.Body className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
          </svg>
            <Card.Title>Sell</Card.Title>
            <Card.Text>
              Stay organized and focused on your goals by prioritizing tasks and setting deadlines.
            </Card.Text>
            <Button variant="primary" onClick={() => handleNavLinkClick('/sell')}>Start Selling Now</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
    <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} modalType={'login'} onLoginSuccess={onLoginSuccess} />
    </>
  );
};

export default LandingCards;
