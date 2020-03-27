import React, { useState, Fragment } from "react";
import Map from "./components/map";
import LeftPanel from "./components/LeftPanel";

export default function App() {
  const [totalSick, setTotal] = useState({
    total: 0,
    lethal: 0,
    newToday: 0,
    recovered: 0
  });

  return (
    <Fragment>
      {totalSick.total !== 0 && <LeftPanel total={totalSick} />}
      <Map setTotal={setTotal} />
    </Fragment>
  );
}
