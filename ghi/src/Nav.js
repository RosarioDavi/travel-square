import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";

// function Navigation() {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">Travel^2</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Explore</Nav.Link>
//             <Nav.Link href="#feed">Feed</Nav.Link>
//             <Nav.Link href="/requests">Request</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// }
function Navigation() {
  <div className="container">
    <header>
      <h2>
        <a href="#">
          <i className="ion-plane"></i>travel<sup>2</sup>
        </a>
      </h2>
      <nav>
        <ul>
          <li>
            <a href="#" title="home">
              home
            </a>
          </li>
          <li>
            <a href="#" title="explore">
              explore
            </a>
          </li>
          <li>
            <a href="/requests" title="request">
              request
            </a>
          </li>
          <li>
            <a className="btn" href="#" title="register | log in">
              register | log in
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <div className="cover">
      <h1>discover what's out there.</h1>
      <form className="flex-form">
        <label for="from">
          <i className="ion-location"></i>
        </label>
        <input type="search" placeholder="where do you want to go?" />
        <input type="submit" value="search" />
      </form>
      <div id="madeby">
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@benblenner" target="_blank">
            Ben Blennerhassett
          </a>
        </span>
      </div>
    </div>
  </div>;
}

export default Navigation;
