import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../../models/user"
import NavBarLoggedIn from "./NavBarLoggedIn"
import NavBarLoggedOut from "./NavBarLoggedOut"

interface NavBarProps {
    loggedInUSer: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessfull: () => void,

}

const NavBar = ({loggedInUSer, onSignUpClicked, onLoginClicked, onLogoutSuccessfull}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
            <Navbar.Brand>
                Bidding App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar"/>
            <Navbar.Collapse id="main-navbar">
              <Nav className="ms-auto">
                { loggedInUSer? 
                    <NavBarLoggedIn user={loggedInUSer} onLogoutSuccessful={onLogoutSuccessfull}/>
                    : <NavBarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                }
              </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar