import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { BsCart3 } from 'react-icons/bs';
import logo from "./images/logo_transparent.png";
import LoginModal from './LoginScreen';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = ({ onLoginSuccess, onLogout }) => {
    const [cartItems, setCartItems] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('token') && JSON.parse(localStorage.getItem('user'));

    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalShow = () => setShowLoginModal(true);

    const addToCart = () => {
        setCartItems(prevItems => prevItems + 1);
    };

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
            {["lg"].map((expand) => (
                <Navbar
                    bg="primary"
                    data-bs-theme="dark"
                    key={expand}
                    expand={expand}
                    className="mb-3"
                >
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                            <img
                                src={logo}
                                width="50"
                                height="46"
                                className="d-inline-block align-top"
                                alt="Material Marketplace Logo"
                            />
                            {""}
                            <span className="ms-2">Material Marketplace</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Material Marketplace
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/dashboard" onClick={() => handleNavLinkClick('/dashboard')} className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}>Dashboard</Nav.Link>
                                    <Nav.Link as={Link} to="/buy" onClick={() => handleNavLinkClick('/buy')} className={location.pathname === '/buy' ? 'nav-link active' : 'nav-link'}>Marketplace</Nav.Link>
                                    <Nav.Link as={Link} to="/sell" onClick={() => handleNavLinkClick('/sell')} className={location.pathname === '/sell' ? 'nav-link active' : 'nav-link'}>Sell</Nav.Link>
                                    <Nav.Link as={Link} to="/cart" onClick={() => handleNavLinkClick('/cart')} className={location.pathname === '/cart' ? 'nav-link active' : 'nav-link'}>
                                        Cart <BsCart3 />
                                        {cartItems > 0 && <span className="cart-items text-danger">{cartItems}</span>}
                                    </Nav.Link>
                                    <NavDropdown
                                        title="Account"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item as={Link} to="/account" onClick={() => handleNavLinkClick('/account')}>
                                            Settings
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/help" onclick={() => handleNavLinkClick('/help')}>
                                            Help
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        {isLoggedIn ? (
                                            <NavDropdown.Item href="#" onClick={handleLogout}>
                                                Logout
                                            </NavDropdown.Item>
                                        ) : (
                                            <NavDropdown.Item href="#" onClick={handleLoginModalShow}>
                                                Login
                                            </NavDropdown.Item>
                                        )}
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        style={{ backgroundColor: "white", color: "blue" }}
                                    />
                                    <Button variant="success">Search</Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
            <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} modalType={'login'} onLoginSuccess={onLoginSuccess} />
        </>
    );
}

export default NavigationBar;
