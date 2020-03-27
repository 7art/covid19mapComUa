import React, { useState, Fragment } from "react";
import Map from "./components/map";
import LeftPanel from "./components/LeftPanel";
import hot from "react-hot-loader";

class App extends React.Component {
  // const [totalSick, setTotal] = useState({
  //   total: 0,
  //   lethal: 0,
  //   newToday: 0,
  //   recovered: 0
  // });
  state = {
    totalSick: {
      total: 0,
      lethal: 0,
      newToday: 0,
      recovered: 0
    }
  };
  setTotal = totalSick => {
    // console.log(totalSick);
    this.setState({ totalSick });
  };
  render() {
    // console.log(this.state);
    return (
      <Fragment>
        {this.state.totalSick.total !== 0 && (
          <LeftPanel total={this.state.totalSick} />
        )}
        <Map setTotal={this.setTotal} />
      </Fragment>
    );
  }
}

if (module.hot) {
  module.hot.accept();
}
export default App;
// export default hot(module)(App);
