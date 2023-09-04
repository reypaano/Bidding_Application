import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { User } from "./models/user";
import * as BiddingApi from "./network/bidding_app_api";
import { Container } from "react-bootstrap";
import SignUpPage from "./components/Auth/SigUpPage";
import LoginPage from "./components/Auth/LoginPage";
import LoggedInLanding from "./components/LoggedInLanding";
import LoggedOutLanding from "./components/LoggedOutLanding";
import Footer from "./components/Footer";

function App() {
  const [loggedInUSer, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  //try to load the user upon render
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await BiddingApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLoggedInUser();
  }, []); // empty array to execute 1 time only

  return (
    <div className="App">
      <NavBar
        loggedInUSer={loggedInUSer}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessfull={() => setLoggedInUser(null)}
      />

      {loggedInUSer ? <LoggedInLanding /> : <LoggedOutLanding />}

      {showSignUpModal && (
        <SignUpPage
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginPage
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
