import React from "react";

export const TestFetch = () => {
  function fetchData() {
    console.log("clik");
    fetch("https://www.trackcorona.live/api/cities")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container">
      <button onClick={() => fetchData()}>START</button>
    </div>
  );
};
