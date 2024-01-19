import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";

const MyNavbar = () => {
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
          <Nav.Link className="nav-link" href="/contact">
            Kontakti
          </Nav.Link>
          <Nav.Link className="nav-link" href="/dashboard">
            Dashboard
          </Nav.Link>

          <NavDropdown title="Semantika" id="basic-nav-dropdown">
            <NavDropdown.Item className="dropdown-link" href="/aeroportet">
              Aeroportet
            </NavDropdown.Item>
            <NavDropdown.Item className="dropdown-link" href="#">
              Shtetet
            </NavDropdown.Item>
            <NavDropdown.Item className="dropdown-link" href="#">
              Hotelet
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link className="nav-link" href="/login">
            Kyçu
          </Nav.Link>
          <Nav.Link className="nav-link" href="/registration">
            Regjistrohu
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
