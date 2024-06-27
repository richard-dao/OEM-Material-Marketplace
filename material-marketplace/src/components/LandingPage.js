import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import LoginModal from './LoginScreen';

const LandingPage = ( { onLoginSuccess, isLoggedIn } ) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalType, setModalType] = useState('login');

  const handleLoginClick = () => {
    setModalType('login');
    setShowLoginModal(true);
  };

  const handleSignUpClick = () => {
    setModalType('signup');
    setShowLoginModal(true);
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Container className="text-center pt-5 pb-3" style={{marginTop: '5rem'}}>
        <h1 className="display-4 fw-normal">Material Marketplace for OEMs</h1>
          <div className="d-flex justify-content-center">
            <p className="mw-p">Material Marketplace is an online store for OEM companies who want to buy and sell materials. Get started by signing in or creating an account.</p>
          </div>
        <Button variant="primary" onClick={handleLoginClick}>Login</Button>{' '}
        <Button variant="secondary" onClick={handleSignUpClick}>Sign Up</Button>
      </Container>
      <LoginModal show={showLoginModal} handleClose={handleModalClose} modalType={modalType} onLoginSuccess={onLoginSuccess}/>
    </>
  );
}

export default LandingPage;
