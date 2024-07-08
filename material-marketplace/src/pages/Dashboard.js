import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import '../Dashboard.css'; // Import the custom CSS file

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

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
  // State to manage active button and chart data
  const [activePeriod, setActivePeriod] = useState('Day');
  const [chartData, setChartData] = useState({ bar: {}, donut1: {}, donut2: {} });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleActivePeriod = (period) => {
    setActivePeriod(period);
    if (showDatePicker){
      setShowDatePicker(!showDatePicker)
    }
  }

  const handleCustomRangeClick = () => {
    setShowDatePicker(!showDatePicker); // Toggle showDatePicker state
    setActivePeriod('Custom')
  };
  


  // Function to generate sample data
  const generateSampleData = (period) => {
    if (period === 'Day') {
      return {
        bar: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [
            {
              label: '# of Sales',
              backgroundColor: '#007bff',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.6)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: [12, 19, 3, 5, 2]
            }
          ]
        },
        donut1: {
          labels: ['Acetal Delrin', 'Aluminum 6061', 'Stainless Steel 17/4'],
          datasets: [
            {
              label: 'Purchase Distribution',
              data: [300, 50, 100],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        },
        donut2: {
          labels: ['Tin 2023', 'Copper', 'Tungsten'],
          datasets: [
            {
              label: 'Sales Distribution',
              data: [200, 150, 100],
              backgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40'],
              hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40']
            }
          ]
        }
      };
    }
    if (period === 'Week') {
      return {
        bar: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Sales',
              backgroundColor: '#007bff',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.6)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: [65, 59, 80, 81]
            }
          ]
        },
        donut1: {
          labels: ['Acetal Delrin', 'Aluminum 6061', 'Stainless Steel 17/4'],
          datasets: [
            {
              label: 'Purchase Distribution',
              data: [400, 60, 150],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        },
        donut2: {
          labels: ['Tin 2023', 'Copper', 'Tungsten'],
          datasets: [
            {
              label: 'Sales Distribution',
              data: [250, 120, 90],
              backgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40'],
              hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40']
            }
          ]
        }
      };
    }
    return {
      bar: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#007bff',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      donut1: {
        labels: ['Acetal Delrin', 'Aluminum 6061', 'Stainless Steel 17/4'],
        datasets: [
          {
            label: 'Purchase Distribution',
            data: [500, 100, 200],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      donut2: {
        labels: ['Tin 2023', 'Copper', 'Tungsten'],
        datasets: [
          {
            label: 'Sales Distribution',
            data: [300, 200, 150],
            backgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40'],
            hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#FF9F40']
          }
        ]
      }
    };
  };

  // UseEffect to set initial data and update on activePeriod change
  useEffect(() => {
    setChartData(generateSampleData(activePeriod));
  }, [activePeriod]);

  // Conditional check to ensure data is available
  const isDataAvailable = chartData.bar.datasets && chartData.bar.datasets.length > 0;

  const renderOptionsDropdown = (headerText) => (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic" className="custom-dropdown-toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-three-dots" viewBox="0 0 16 16">
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
      </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">
        
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download mx-2" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
          </svg>
          <span>Download</span></Dropdown.Item>
        <Dropdown.Item href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share mx-2" viewBox="0 0 16 16">
          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
        </svg>
          <span>Share</span></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const topSoldItems = [
    { id: 1, name: 'Acetal Delrin', sold: 2500, image: 'https://via.placeholder.com/50x50' },
    { id: 2, name: 'Aluminum 6061', sold: 1500, image: 'https://via.placeholder.com/50x50' },
    { id: 3, name: 'Stainless Steel 17/4', sold: 500, image: 'https://via.placeholder.com/50x50' },
    { id: 4, name: 'Xenon', sold: 10, image: 'https://via.placeholder.com/50x50' },
  ];

  const wishlistItems = [
    { id: 'A', name: 'Tin 2023', image: 'https://via.placeholder.com/50x50' },
    { id: 'B', name: 'Copper', image: 'https://via.placeholder.com/50x50' },
    { id: 'C', name: 'Tungsten', image: 'https://via.placeholder.com/50x50' },
    { id: 'D', name: 'Titanium', image: 'https://via.placeholder.com/50x50' },

  ];

  const getRandomBoolean = () => {
    return Math.random() < 0.5;
  };

  const renderTopSoldItems = () => (
    <Card className="mb-4 custom-card">
      <Card.Header>Top Sold Items</Card.Header>
      <Card.Body>
        <table className="table">
          <tbody>
            {topSoldItems.map((item) => (
              <tr key={item.id} className="align-middle">
                <td><img src={item.image} alt={item.name} className="product-image-dashboard d-inline-block align-top me-2" /><span className="d-inline-block align-top mt-1">{item.name}</span></td>
                <td className="text-end">{getRandomBoolean() ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#96ECA9" className="bi bi-arrow-up" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>
                  )}
                  <span style={{fontWeight: "bold"}}>{item.sold}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );

  const renderWishlistItems = () => (
    <Card className="custom-card">
      <Card.Header>Wishlist</Card.Header>
      <Card.Body>
        <table className="table">
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="align-middle"> 
                <td><img src={item.image} alt={item.name} className="product-image-dashboard d-inline-block align-top me-2" /><span className="d-inline-block align-top mt-1">{item.name}</span></td>
                <td className="text-end">
                    <Button className="primary">Buy</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="px-5 py-3 mb-5">
      {/* Dashboard Header Row */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-left">Dashboard</h2>
        </Col>
      </Row>

      {/* Top Left Section for Day/Week/Month Options */}
      <Row className="mb-4">
        <Col>
          <ButtonGroup className="custom-button-group with-shadow me-2">
            <Button 
              variant={activePeriod === 'Day' ? 'primary' : 'outline-primary'} 
              className="custom-button-first" 
              onClick={() => handleActivePeriod('Day')}
            >
              Day
            </Button>
            <Button 
              variant={activePeriod === 'Week' ? 'primary' : 'outline-primary'} 
              className="custom-button" 
              onClick={() => handleActivePeriod('Week')}
            >
              Week
            </Button>
            <Button 
              variant={activePeriod === 'Month' ? 'primary' : 'outline-primary'} 
              className="custom-button-last" 
              onClick={() => handleActivePeriod('Month')}
            >
              Month
            </Button>
          </ButtonGroup>
          <ButtonGroup className="custom-button-group with-shadow">
            <Button 
              variant={activePeriod === "Custom" ? 'primary' : 'outline-primary'}
              onClick={handleCustomRangeClick}
            >
              <span>Custom Date</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill ms-2" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>

            </Button>
            {showDatePicker && (
              <div className="custom-range-popout">
                <DatePicker
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  inline
                />
              </div>
            )}
            </ButtonGroup>  
        </Col>
      </Row>

      {/* Main Content Row */}
      <Row>
        {/* Left Section - 1/4 of the width for Pie Charts */}
        <Col md={3}>
          <Row className="mb-4">
            <Col>
              <Card className="custom-card">
                <Card.Header className="d-flex align-items-center justify-content-between"><div>Purchases Breakdown</div> <div>{renderOptionsDropdown("Purchases Breakdown")}</div> </Card.Header>
                <Card.Body>
                  {isDataAvailable && (
                    <Doughnut 
                      data={chartData.donut1} 
                      options={{
                        maintainAspectRatio: false,
                        cutout: '70%', // Adjust inner radius for a donut chart effect
                        plugins: {
                          legend: {
                            display: true,
                            position: 'top',
                          },
                        },
                      }}
                      height={214}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="custom-card">
              <Card.Header className="d-flex align-items-center justify-content-between"><div>Sales Breakdown</div> <div>{renderOptionsDropdown("Sales Breakdown")}</div> </Card.Header>
                <Card.Body>
                  {isDataAvailable && (
                    <Doughnut 
                      data={chartData.donut2} 
                      options={{
                        maintainAspectRatio: false,
                        cutout: '70%', // Adjust inner radius for a donut chart effect
                        plugins: {
                          legend: {
                            display: true,
                            position: 'top',
                          },
                        },
                      }}
                      height={214}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Middle Section - 2/4 of the width for Summary Cards and Bar Chart */}
        <Col md={6}>
          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <Card.Title>Total Sales</Card.Title>
                  <Card.Text className="d-inline-block align-top">
                    <h4 className="inline-block" style={{ display: 'inline-block', marginRight: '10px' }}>$12,345</h4>
                    <span className="inline-block" style={{ display: 'inline-block', color: '#96ECA9', fontWeight: 'bold' }}>+7.46%</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <Card.Title>Expenses</Card.Title>
                  <Card.Text className="d-inline-block align-top">
                    <h4 className="inline-block" style={{ display: 'inline-block', marginRight: '10px' }}>$7,890</h4>
                    <span className="inline-block" style={{ display: 'inline-block', color: '#FE8383', fontWeight: 'bold' }}>-9.51%</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <Card.Title>New Customers</Card.Title>
                  <Card.Text className="d-inline-block align-top">
                    <h4 className="inline-block" style={{ display: 'inline-block', marginRight: '10px' }}>456</h4>
                    <span className="inline-block" style={{ display: 'inline-block', color: '#96ECA9', fontWeight: 'bold' }}>+4.38%</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Row for the Bar Chart */}
          <Row>
            <Col>
              <Card className="custom-card">
              <Card.Header className="d-flex align-items-center justify-content-between"><div>Sales Performance</div> <div>{renderOptionsDropdown("Sales Performance")}</div> </Card.Header>
                <Card.Body>
                  {isDataAvailable && (
                    <Bar 
                      data={chartData.bar} 
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                            },
                            ticks: {
                              autoskip: true,
                              maxRotation: 0,
                              minRotation: 0,
                            },
                            beginAtZero: true
                          },
                          y: {
                            beginAtZero: true
                          }
                        },
                        plugins: {
                          legend: {
                            display: true,
                            position: 'top',
                          },
                        },
                        animation: {
                          duration: 1000, // Animation duration for loading effect
                          easing: 'easeInOutQuad'
                        }
                      }}
                      height={433}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right Section - 1/4 of the width for Top Sold Items and Wishlist */}
        <Col md={3}>
          {/* Top Sold Items */}
          {renderTopSoldItems()}
          {renderWishlistItems()}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
