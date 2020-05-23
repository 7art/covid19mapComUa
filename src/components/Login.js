import React, { useCallback, useContext } from "react";
import { MDBInput, MDBBtn, MDBJumbotron, MDBBox } from "mdbreact";

import { withRouter, Redirect } from "react-router";
import firebase from "./FirebaseConfig";
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/edit/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/edit" />;
  }

  return (
    <MDBBox display="flex" justifyContent="center" className="mt-5">
      <MDBJumbotron className="w-40 mx-auto p-3 mt-2 login">
        <form onSubmit={handleLogin}>
          <p className="h5 text-center mb-4">Login</p>
          <div className="grey-text">
            <MDBInput
              name="email"
              label="Type your email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              name="password"
              label="Type your password"
              icon="lock"
              group
              type="password"
              validate
            />
          </div>
          <div className="text-center">
            <MDBBtn gradient="aqua" type="submit">
              Login
            </MDBBtn>
          </div>
        </form>
      </MDBJumbotron>
    </MDBBox>
  );
};

export default withRouter(Login);
