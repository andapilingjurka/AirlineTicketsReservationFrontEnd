// MyNavbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../LoginRegister/jwtUtils';
import './navbar.css';

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const isAdmin = decodedToken && decodedToken.role === 'admin';

  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Brand href="/" className="navbar-brand">
        AirlineTicketsReservation
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto navbar-nav ">
          <Nav.Link className="nav-link" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="nav-link" href="/aboutus">
            RrethNesh
          </Nav.Link>
          <Nav.Link className="nav-link" href="/citylist">
            Destinacionet
          </Nav.Link>
          <Nav.Link className="nav-link" href="/fluturime">
            Fluturimet
          </Nav.Link>
          <Nav.Link className="nav-link" href="/contact">
            Kontakti
          </Nav.Link>
          <NavDropdown title="Semantika" id="basic-nav-dropdown">
            <NavDropdown.Item className="dropdown-link" href="/aeroportet">
              Aeroportet
            </NavDropdown.Item>
            <NavDropdown.Item className="dropdown-link" href="/shtetetsemantic">
              Shtetet
            </NavDropdown.Item>
            <NavDropdown.Item className="dropdown-link" href="/kontinentet">
              Kontinentet
            </NavDropdown.Item>
          </NavDropdown>

          {isAdmin && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}

          {localStorage.getItem('token') ? (
            <>
              <button onClick={handleLogout} className="nav-link">
                Çkyqu
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Kyqu
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;