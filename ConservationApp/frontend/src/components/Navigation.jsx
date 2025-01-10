import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Conservation App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Animal</Nav.Link>
            <Nav.Link href="/ranger">Ranger</Nav.Link>
            <Nav.Link href="/donor">Donor</Nav.Link>
            <Nav.Link href="/organism">Organism</Nav.Link>
            <Nav.Link href="/region">Region</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
