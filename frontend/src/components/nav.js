import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">PicGuard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/features">Features</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Gallery">Gallery</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>

            </Nav>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link href="/Login">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;



