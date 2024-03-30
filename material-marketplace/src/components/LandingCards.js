import React from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import { GraphUp, Cart4, Cash } from 'bootstrap-icons-react';

const LandingCards = () => {
  return (
    <Container style={{marginTop: '4rem'}}>
      <h2 className="text-center">What We Offer</h2>
      <Row className="justify-content-center" style={{marginTop: '2rem'}}> {/* Replaced div with Row */}
        <Card className="col-lg-4 g-2 shadow" style={{ width: '18rem', marginLeft: '20px' }}> {/* Added g-2 for margin */}
          <Card.Body className="text-center">
            <GraphUp style={{ fontSize: '40px' }} className="mb-2" /> {/* Removed inline class */}
            <Card.Title>Dashboard</Card.Title>
            <Card.Text>
              Keep track of all your materials and profits using our custom made analytics tools
            </Card.Text>
            <Button variant="primary">Go to Your Dashboard</Button>
          </Card.Body>
        </Card>
        <Card className="col-lg-4 g-2 shadow" style={{ width: '18rem', marginLeft: '20px' }}> {/* Added g-2 for margin */}
          <Card.Body className="text-center">
            <Cart4 style={{ fontSize: '40px' }} className="mb-2" /> {/* Removed inline class */}
            <Card.Title>Buy</Card.Title>
            <Card.Text>
              Seamlessly purchase materials from other company's excesses at lower prices
            </Card.Text>
            <Button variant="primary">Search the Marketplace</Button>
          </Card.Body>
        </Card>
        <Card className="col-lg-4 g-2 shadow" style={{ width: '18rem', marginLeft: '20px' }}> {/* Added g-2 for margin */}
          <Card.Body className="text-center">
            <Cash style={{ fontSize: '40px' }} className="mb-2" /> {/* Removed inline class */}
            <Card.Title>Sell</Card.Title>
            <Card.Text>
              Stay organized and focused on your goals by prioritizing tasks and setting deadlines.
            </Card.Text>
            <Button variant="primary">Start Selling Now</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default LandingCards;
