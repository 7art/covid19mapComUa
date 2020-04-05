import React, { Fragment } from "react";
import Map from "./components/Map";
import EditAreas from "./components/EditAreas";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Map} />
        <Route path="/edit/" component={EditAreas} />
      </div>
    </Router>
  );
};

export default App;
