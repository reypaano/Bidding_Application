import { useState } from "react";
import { Button, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { User } from "../../models/user";
import * as BiddingApi from "../../network/bidding_app_api";
import CreateNewItemModal from "../CreateNewItemModal";
import style from "../../styles/utils.module.css";

interface NavBarLoggedInProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedIn = ({ user, onLogoutSuccessful }: NavBarLoggedInProps) => {
  async function logout() {
    try {
      await BiddingApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  //   const [showCreateNewItemModal, setShowCreateNewItemModal] = useState(false);

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <NavDropdown title="Profile" id="basic-nav-dropdown">
        <NavDropdown.Item>Deposit</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.3" onClick={logout}>
          {" "}
          Logout
        </NavDropdown.Item>
      </NavDropdown>

      {/* {showCreateNewItemModal && (
        <CreateNewItemModal
          onDismiss={() => setShowCreateNewItemModal(false)}
          onItemSaved={() => {
            setShowCreateNewItemModal(false);
          }}
        />
      )} */}
    </>
  );
};

export default NavBarLoggedIn;
