import React from "react";

const SpinnerPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-primary m-5"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerPage;
