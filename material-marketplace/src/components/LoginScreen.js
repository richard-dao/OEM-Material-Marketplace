import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const LoginModal = ({ show, handleClose, modalType, onLoginSuccess }) => {
  const [showCompanyField, setShowCompanyField] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Login');
  const [secondaryButtonText, setSecondaryButtonText] = useState('Sign Up');
  const [modalTitle, setModalTitle] = useState('Login');

  useEffect(() => {
    if (modalType === 'signup') {
      setShowCompanyField(true);
      setSubmitButtonText('Create Account');
      setSecondaryButtonText('Login');
      setModalTitle('Sign Up');
    } else {
      setShowCompanyField(false);
      setSubmitButtonText('Login');
      setSecondaryButtonText('Sign Up');
      setModalTitle('Login');
    }
  }, [modalType]);

  const handleLogin = () => {
    setSubmitButtonText('Login');
    setSecondaryButtonText('Sign Up');
    setModalTitle('Login');
    setShowCompanyField(false);
  }

  const handleSignUp = () => {
    setSubmitButtonText('Create Account');
    setSecondaryButtonText('Login')
    setModalTitle('Sign Up');
    setShowCompanyField(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic based on modalType
    const formData = {
      email: e.target.elements.formBasicEmail.value,
      password: e.target.elements.formBasicPassword.value,
      companyName: showCompanyField ? e.target.elements.formBasicCompany.value : ''
    };

    const endpoint = showCompanyField ? '/api/signup' : '/api/login';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`${modalType} successful`, data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log(data.token);
        console.log(data.user);

        if (showCompanyField){
          handleLogin();
        } else {
          handleClose();
          if (onLoginSuccess) {
            onLoginSuccess(data.user);
          }
        }

      } else {
        // If response is not OK, parse the error message
        const errorData = await response.json();
        console.error(`${modalType} failed:`, errorData.error);
      }
    } catch (error) {
      console.error(`Error during ${modalType}:`, error.message);
    }


  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <div className="mb-2"></div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="mb-2"></div>

          {showCompanyField && (
            <Form.Group controlId="formBasicCompany">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter company name" />
            </Form.Group>
          )}

          <div className="mb-3"></div>
          <div className="d-flex">
            <Button variant="primary" type="submit" >
              {submitButtonText}
            </Button>
            
            <Button variant="secondary" className="ms-2" onClick={secondaryButtonText === 'Login' ? handleLogin : handleSignUp}>
              {secondaryButtonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
