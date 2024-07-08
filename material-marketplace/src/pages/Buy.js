// src/pages/Buy.js

import React from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import '../Buy.css'; // Import your custom CSS

const products = [
    {id: 1, name: 'Acetal Delrin', price: '$100', image: 'https://via.placeholder.com/50x50', dimensions: '3x6', quantity: '0', soldBy: 'Precision Swiss Products'},
    {id: 2, name: 'Aluminum 6061', price: '$150', image: 'https://via.placeholder.com/50x50', dimensions: '3x6', quantity: '10', soldBy: 'Precision Swiss Products'},
    {id: 3, name: 'Stainless Steel 17/4', price: '$50', image: 'https://via.placeholder.com/50x50', dimensions: '9x6x3', quantity: '20', soldBy: 'Precision Swiss Products'},
    {id: 4, name: 'Copper', price: '$20', image: 'https://via.placeholder.com/50x50', dimensions: '3x6', quantity: '30', soldBy: "Qingyuan's OEM Company"},
    {id: 5, name: 'Tin 2023', price: '$1', image: 'https://via.placeholder.com/50x50', dimensions: '2x2x2', quantity: '500', soldBy: "Qingyuan's OEM Company"},
    {id: 6, name: 'Titanium', price: '$20000', image: 'https://via.placeholder.com/50x50', dimensions: '10x20x30', quantity: '1000', soldBy: "Richard's OEM Productions"},
    {id: 7, name: 'Tungsten', price: 'N/A', image: 'https://via.placeholder.com/50x50', dimensions: '-', quantity: '-', soldBy: 'Precision Swiss Products'},
    {id: 8, name: 'Xenon', price: 'N/A', image: 'https://via.placeholder.com/50x50', dimensions: '-', quantity: '-', soldBy: 'Precision Swiss Products'},
    // Add more products as needed
];

const Buy = () => {
    const handleBuyClick = (productId) => {
        // Implement your buy button click logic here
        console.log(`Buy button clicked for product ID ${productId}`);
    };

    return (
        <Container fluid className="px-5 py-3 mb-5">
            {/* Dashboard Header Row */}
            <Row className="mb-4">
                <Col>
                    <h2 className="text-left">Marketplace</h2>
                </Col>
            </Row>
            <div className="grid-container">
                <div className="filters-section">
                    <Form>
                        {/* Add your filter components here */}
                        <Form.Group controlId="exampleForm.Checkbox">
                            <Form.Label>Filters</Form.Label>
                            <Form.Check type="checkbox" label="Checkbox option 1" />
                            <Form.Check type="checkbox" label="Checkbox option 2" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.Range">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control type="range" />
                        </Form.Group>
                        {/* Add more filters as needed */}
                    </Form>
                </div>
                <div className="grid-section">
                    <Row className="mb-3">
                        <Col md={6}></Col>
                        <Col md={6} className="d-flex justify-content-end">
                            {/* Search bar fixed on the right side */}
                            <Form inline className="search-form d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search m-2" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                                <Form.Control type="text" placeholder="Search products..." className="search-input" />
                            </Form>
                        </Col>
                    </Row>
                    <Table bordered hover responsive className="table-no-border">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Dimensions</th>
                                <th>Quantity</th>
                                <th>Sold By</th>
                                <th></th> {/* New column for Buy button */}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="align-middle">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={process.env.PUBLIC_URL + product.image}
                                                width="50"
                                                height="46"
                                                className="d-inline-block align-top m-2"
                                                alt="Product"
                                            />
                                            <span className="product-name">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="align-middle">{product.price}</td>
                                    <td className="align-middle">{product.dimensions}</td>
                                    <td className='align-middle'>{product.quantity}</td>
                                    <td className='align-middle'>{product.soldBy}</td>
                                    <td className="align-middle">
                                        <Button onClick={() => handleBuyClick(product.id)} variant="primary">
                                            Add
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    );
}

export default Buy;
