import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../../models/user";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";
import BidLogo from "../../assets/bid-logo.png";
import style from "../../styles/utils.module.css";

interface NavBarProps {
  loggedInUSer: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessfull: () => void;
}

const NavBar = ({
  loggedInUSer,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessfull,
}: NavBarProps) => {
  return (
    <Navbar
      className={`${style.defaultNav}`}
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand>
          <img
            src={BidLogo}
            width="50"
            height="50"
            className="d-inline-block align-middle align"
            alt="Bidding logo"
            style={{ marginRight: "20px" }}
          />
          Bidding App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUSer ? (
              <NavBarLoggedIn
                user={loggedInUSer}
                onLogoutSuccessful={onLogoutSuccessfull}
              />
            ) : (
              <NavBarLoggedOut
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
