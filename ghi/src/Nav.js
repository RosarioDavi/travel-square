import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Travel^2</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Explore</Nav.Link>
            <Nav.Link href="#feed">Feed</Nav.Link>
            <Nav.Link href="#request">Request</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
