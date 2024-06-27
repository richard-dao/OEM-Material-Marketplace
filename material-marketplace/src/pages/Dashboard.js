// Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Register components with Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for Chart.js
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  return (
    <Container fluid className="mt-4">
      {/* Dashboard Header Row */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Dashboard</h2>
        </Col>
      </Row>

      {/* Main Content Row */}
      <Row>
        {/* Chart Section - 3/4 of the width */}
        <Col md={9}>
          {/* Row for Summary Cards */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total Sales</Card.Title>
                  <Card.Text>
                    $12,345
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Expenses</Card.Title>
                  <Card.Text>
                    $7,890
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>New Customers</Card.Title>
                  <Card.Text>
                    456
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Row for the Chart */}
          <Row>
            <Col>
              <Card>
                <Card.Header>Sales Performance</Card.Header>
                <Card.Body>
                  <Bar 
                    data={chartData} 
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          beginAtZero: true
                        },
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                    height={400}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Side Section - 1/4 of the width */}
        <Col md={3}>
          {/* Top Sold Items */}
          <Card className="mb-4">
            <Card.Header>Top Sold Items</Card.Header>
            <Card.Body>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
                <li>Item 5</li>
              </ul>
            </Card.Body>
          </Card>
          
          {/* Wishlist */}
          <Card>
            <Card.Header>Wishlist</Card.Header>
            <Card.Body>
              <ul>
                <li>Item A</li>
                <li>Item B</li>
                <li>Item C</li>
                <li>Item D</li>
                <li>Item E</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
