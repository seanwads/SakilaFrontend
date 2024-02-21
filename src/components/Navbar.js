import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
      <>
      <Navbar>
        <NavbarBrand>
          <NavLink to="/">
            widescreend
          </NavLink>
        </NavbarBrand>
        <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/film-list">All Films</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">My Films</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
      </>
    )
  }
  
  export default NavBar;