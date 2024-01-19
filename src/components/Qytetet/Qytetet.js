import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./qytetet.css";
import MyNavbar from "../include/Navbar";
import Footer from "../include/Footer";

const CityComponent = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadCities();
  }, []);

  async function loadCities() {
    try {
      const response = await axios.get(
        "https://localhost:7285/api/Qyteti/GetAllList"
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  }

  return (
    <div>
      <MyNavbar />
      <Container>
        <Row>
          {cities.map((city, index) => (
            <Col key={index} xs={12} md={6}>
              {/* Krijoni një div për çdo qytet */}
              <div className="city-container">
                <div className="city-image">
                  <img src={city.image} alt={`Image of ${city.emri}`} />
                </div>
                <div className="city-info">
                  <h5>{city.emri}</h5>
                  <p>
                    <strong>Shteti:</strong> {city.shteti.emri}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default CityComponent;
