// FlightComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";



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
  
  );
};

export default FlightComponent;