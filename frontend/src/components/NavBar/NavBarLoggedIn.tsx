import { Button, Navbar, NavDropdown, NavLink } from "react-bootstrap"
import { User } from "../../models/user"
import * as BiddingApi from "../../network/bidding_app_api"


interface NavBarLoggedInProps {
    user: User
    onLogoutSuccessful: () => void,
}

const NavBarLoggedIn = ({user, onLogoutSuccessful}: NavBarLoggedInProps) => {
    async function logout() {
        try {
            await BiddingApi.logout()
            onLogoutSuccessful()

        } catch (error) {
            alert(error)
            console.error(error)
        }
    }
  
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Create New Item</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Deposit</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3"  
                onClick={logout}> Logout</NavDropdown.Item>
             
            </NavDropdown>
            
        </>
  )
}

export default NavBarLoggedIn