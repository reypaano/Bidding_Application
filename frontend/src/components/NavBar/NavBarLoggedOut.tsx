import { Button } from "react-bootstrap";
import styles from "../../styles/utils.module.css";

interface NavBarLoggedOutProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOut = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutProps) => {
  return (
    <>
      <input
        className={`${styles.loggedOutPageBtn}`}
        type="button"
        value="Sign Up"
        onClick={onSignUpClicked}
      />
      <input
        className={`${styles.loggedOutPageBtn}`}
        type="button"
        value="Login"
        onClick={onLoginClicked}
      />
    </>
  );
};

export default NavBarLoggedOut;
