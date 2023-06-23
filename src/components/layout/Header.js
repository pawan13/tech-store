import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">CTS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/dashboard" title="Dashboard">
              <AiFillDashboard />
            </Link>
            <Link className="nav-link" to="#!" title="Logout">
              <ImExit />
            </Link>
            <Link className="nav-link" to="/" title="Login">
              <TbLogin />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
