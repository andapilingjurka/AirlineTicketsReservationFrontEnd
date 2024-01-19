// FlightComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import MyNavbar from "../include/Navbar";
import Footer from "../include/Footer";


const FlightComponent = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Load();
  }, []);

  const handleReserveClick = (flightId) => {
    // Navigate to the reservation page and pass the flight ID as a parameter
    navigate(`/rezervime?flightId=${flightId}`);
  };
  async function Load() {
    try {
      const response = await axios.get('https://localhost:7285/api/Fluturimi/GetAllList');
      setFlights(response.data);
    } catch (error) {
      console.error('Error loading flights:', error);
    }
  }

  return (
    <div>
      <MyNavbar/>
    
      <Container className="mt-4" >
      <h1>Avaliable Flights</h1>
        <Row sm={4} >
          {flights.map(flight => (
            <Col key={flight.nrFluturimit} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon icon={faPlane} className="mr-2" />
                    {flight.nrFluturimit}
                  </Card.Title>
                  <Card.Text>
                    <strong>Departure Airport:</strong> {flight.deparuteAirport}<br />
                    <strong>Arrival Airport:</strong> {flight.arrivalAirport}<br />
                    <strong>Departure Time:</strong> {flight.kohaENisjes}<br />
                    <strong>Arrival Time:</strong> {flight.kohaEArritjes}<br />
                    <strong>Price:</strong> {flight.cmimi}<br />
                    <strong>City:</strong> {flight.qytetiId}<br />
                    <strong>Airplane:</strong> {flight.aeroplaniId}
                  </Card.Text>
                  <Button onClick={() => handleReserveClick(flight.id)}>
                    <FontAwesomeIcon icon={faTicket} className="mr-2" />
                     Rezervo
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default FlightComponent;