// Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register components with Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Sample data for Bar Chart
  const barChartData = {
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

  // Sample data for Pie Charts
  const pieChartData1 = {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [
      {
        label: 'Category Distribution',
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const pieChartData2 = {
    labels: ['Segment 1', 'Segment 2', 'Segment 3'],
    datasets: [
      {
        label: 'Segment Distribution',
        data: [200, 150, 100],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40']
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
        {/* Left Section - 1/4 of the width for Pie Charts */}
        <Col md={3}>
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header>Pie Chart 1</Card.Header>
                <Card.Body>
                  <Pie 
                    data={pieChartData1} 
                    options={{
                      maintainAspectRatio: false
                    }}
                    height={200}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header>Pie Chart 2</Card.Header>
                <Card.Body>
                  <Pie 
                    data={pieChartData2} 
                    options={{
                      maintainAspectRatio: false
                    }}
                    height={200}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Middle Section - 2/4 of the width for Summary Cards and Bar Chart */}
        <Col md={6}>
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

          {/* Row for the Bar Chart */}
          <Row>
            <Col>
              <Card>
                <Card.Header>Sales Performance</Card.Header>
                <Card.Body>
                  <Bar 
                    data={barChartData} 
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

        {/* Right Section - 1/4 of the width for Top Sold Items and Wishlist */}
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
