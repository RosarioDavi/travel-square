import { NavLink } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import './Nav.css';
import { LoginModal } from "./Accounts/LoginModal";
import { LogoutModal } from "./LogoutModal";
import { useGetTokenQuery } from './store/authApi'

function Navigation() {

  const {data: tokenData} = useGetTokenQuery()

  if (!tokenData) {
    return (
      <>
        <div className="container">

          <header>
            <h2><a href="#"><i className="ion-plane"></i>travel<sup>2</sup></a></h2>
            <nav>
              <ul>
                <li>
                <NavLink to="/"> HomePage</NavLink>
                </li>
                <li>
                    <NavLink to="/explore"> Explore</NavLink>
                </li>
                <li>
                  <a href="#" title="request">request</a>
                </li>
                <li>
                  <LoginModal/>
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    );
  } else {
    return (
      <>
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
                <NavLink to="/"> HomePage</NavLink>
              </li>
              <li>
                <NavLink to="/explore"> Explore</NavLink>
              </li>
              <li>
                <NavLink to="/request"> Request</NavLink>
              </li>
              <li>
                <LogoutModal/>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      </>
    );
  }
}

export default Navigation;

/*
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
*/
