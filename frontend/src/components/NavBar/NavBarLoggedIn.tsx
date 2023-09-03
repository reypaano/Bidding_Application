import { useState } from "react";
import { Button, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { User } from "../../models/user";
import * as BiddingApi from "../../network/bidding_app_api";
import CreateNewItemModal from "../CreateNewItemModal";
import styles from "../../styles/utils.module.css";
import DepositModal from "../DepositModal";

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

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [userWallet, setUserWallet] = useState(user.wallet);

  return (
    <>
      <Navbar.Text className={`${styles.navName}`}>
        Signed in as: {user.username}
      </Navbar.Text>
      <Navbar.Text className="me-2">
        Wallet:{" "}
        {user.wallet.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
      </Navbar.Text>
      <NavDropdown title="Profile" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => setShowDepositModal(true)}>
          Deposit
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.3" onClick={logout}>
          {" "}
          Logout
        </NavDropdown.Item>
      </NavDropdown>

      {showDepositModal && (
        <DepositModal
          userToEdit={user}
          onDismiss={() => setShowDepositModal(false)}
          onUserSaved={(newUser) => {
            setShowDepositModal(false);
            user.wallet = newUser.wallet;
            // setUserWallet()
          }}
        />
      )}
    </>
  );
};

export default NavBarLoggedIn;
