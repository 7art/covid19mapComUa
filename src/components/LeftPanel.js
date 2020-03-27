import React from "react";
import {
  MDBCard,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBIcon,
  MDBCardFooter
} from "mdbreact";

let today = new Date().toLocaleDateString();

function LeftPanel(props) {
  // console.log(props);
  const { total, lethal, newToday, recovered } = props.total;
  return (
    <MDBCard className="left-panel" style={{ position: "absolute" }}>
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

export default LeftPanel;
