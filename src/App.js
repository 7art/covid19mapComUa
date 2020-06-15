import React from "react";
import Map from "./components/Map";
import Login from "./components/Login";
import EditFeatureInfo from "./components/EditFeatureInfo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth";

import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Map} />
        <Route exact path="/login/" component={Login} />
        <PrivateRoute exact path="/edit/" component={EditFeatureInfo} />
      </Router>
    </AuthProvider>
  );
};

export default App;
