import React from "react";
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";

let today = new Date().toLocaleDateString();

function LeftSidebar(props) {
  const { total, lethal, newToday, recovered } = props.total;
  //className="left-panel"
  return (
    <MDBCard
      className="left-panel"
      style={{ position: "absolute", opacity: 0.7 }}
    >
      <MDBListGroup>
        <MDBListGroupItem className="font-weight-bold light-blue-text">
          Захворіло всього: {total}
        </MDBListGroupItem>
        <MDBListGroupItem>За останню добу: {newToday}</MDBListGroupItem>
        <MDBListGroupItem>Летальні випадки: {lethal}</MDBListGroupItem>
        <MDBListGroupItem>Одужало: {recovered}</MDBListGroupItem>
        <MDBListGroupItem className="font-weight-bold dark-grey-text">
          <MDBIcon far icon="clock" className="pr-2" />
          {today}
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCard>
  );
}
export default LeftSidebar;
