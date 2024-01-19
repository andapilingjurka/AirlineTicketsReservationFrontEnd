import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="py-5 footer">
      <Container>
        <Row>
          <Col lg={8} md={6}>
            <Row>
              <Col md={6}>
                <h5 className="footer-h5">Kontakto</h5>
                <p className="footer-p">Email: info@example.com</p>
                <p className="footer-p">Telefon: +123 456 789</p>
              </Col>
              <Col md={6}>
                <h5 className="footer-h5">Linket</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/aboutus">Rreth Nesh</a>
                  </li>
                  <li>
                    <a href="/citylist">Destinacionet</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={6}>
            <h5 className="footer-h5-media">Social Media</h5>
            <div className="social-icons">
              <a href="#" className="facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-secondary">
        &copy; {new Date().getFullYear()} AirlineTicketsReservation
      </div>
    </footer>
  );
};

export default Footer;
