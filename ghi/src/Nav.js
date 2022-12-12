import { NavLink } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
import { LoginModal } from "./Accounts/LoginModal";
import { LogoutModal } from "./Accounts/LogoutModal";
import { SignupModal } from "./Accounts/SignupModal";
import { useGetTokenQuery } from "./store/authApi";

function Navigation() {
  const { data: tokenData, isLoading } = useGetTokenQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.account.is_admin === false) {
    return (
      <>
        <div className="container">
          <header>
            <h2>
              travel<sup>2</sup>
            </h2>
            <nav>
              <ul>
                <li>
                  <NavLink to="/"> Home</NavLink>
                </li>
                <li>
                  <NavLink to="/explore"> Explore</NavLink>
                </li>
                <li>
                  <NavLink to="/trending"> Trending</NavLink>
                </li>
                <li>
                  <NavLink to="/request"> Request</NavLink>
                </li>
                <li>
                  <LogoutModal />
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    );
  } else if (tokenData && tokenData.account.is_admin === true) {
    return (
      <>
        <div className="container">
          <header>
            <h2>
              travel<sup>2</sup>
            </h2>
            <nav>
              <ul>
                <li>
                  <NavLink to="/"> Home</NavLink>
                </li>
                <li>
                  <NavLink to="/explore"> Explore</NavLink>
                </li>
                <li>
                  <NavLink to="/trending"> Trending</NavLink>
                </li>
                <li>
                  <NavLink to="/request"> Request</NavLink>
                </li>
                <li>
                  <NavLink to="/unapproved"> Unapproved Venues</NavLink>
                </li>
                <li>
                  <NavLink to="/categories"> Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard"> Dashboard</NavLink>
                </li>
                <li>
                  <LogoutModal />
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    );
  } else if (!tokenData) {
    return (
      <>
        <div className="container">
          <header>
            <h2>
              travel<sup>2</sup>
            </h2>
            <nav>
              <ul>
                <li>
                  <NavLink to="/"> home</NavLink>
                </li>
                <li>
                  <NavLink to="/explore"> explore</NavLink>
                </li>
                <li>
                  <NavLink to="/trending"> trending</NavLink>
                </li>
                <li>
                  <NavLink to="/request"> request</NavLink>
                </li>
                <li>
                  <SignupModal />
                </li>
                <li>
                  <LoginModal />
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
