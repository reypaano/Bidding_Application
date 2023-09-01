import { Button } from "react-bootstrap"

interface NavBarLoggedOutProps {
    onSignUpClicked: () =>void
    onLoginClicked: () =>void
}

const NavBarLoggedOut = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutProps) => {

    return(
       <>
       <Button onClick={onSignUpClicked}>Sign Up</Button>
       <Button onClick={onLoginClicked}>Login</Button>
       </> 
    )
}

export default NavBarLoggedOut