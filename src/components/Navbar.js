import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar>
          <NavbarBrand>
             <NavLink tag={Link} to="/">
               widescreend
             </NavLink>
            </NavbarBrand>
          <Nav>
          <NavItem>
            <NavLink tag={Link} to="/film-list">
              All Films
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile">
              My Films
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/add-film">
              New Film
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
  
  export default NavBar;