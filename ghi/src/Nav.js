import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";

function Navigation() {
  return (
    <>
      <header>
        <h2>
          <a href="#">
            <i className="ion-plane"></i>travel<sup>2</sup>
          </a>
        </h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/"> Home</NavLink>
            </li>
            <li>
              <a href="#" title="explore">
                Explore
              </a>
            </li>
            <li>
              <NavLink to="/requests"> Request</NavLink>
            </li>
            <li>
              <a className="btn" href="#" title="register | log in">
                register | log in
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
