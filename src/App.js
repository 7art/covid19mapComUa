import React, { useState, Fragment } from "react";
import Map from "./components/Map";
import LeftPanel from "./components/LeftPanel";

const App = () => {
  const [totalSick, setTotal] = useState({
    total: 0,
    lethal: 0,
    newToday: 0,
    recovered: 0
  });

  const setTotalSick = totalSick => {
    setTotal(totalSick);
  };

  return (
    <Fragment>
      {totalSick.total !== 0 && <LeftPanel total={totalSick} />}
      <Map setTotal={setTotalSick} />
    </Fragment>
  );
};

export default App;
