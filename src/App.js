import React from "react";
import Map from "./components/Map";
import EditFeatureInfo from "./components/EditFeatureInfo";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Map} />
        <Route path="/edit/" component={EditFeatureInfo} />
      </div>
    </Router>
  );
};

export default App;
