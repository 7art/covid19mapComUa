import React from "react";
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import LastUpdatedInfo from "./LastUpdatedInfo";
// let dateToday = new Date().toLocaleDateString();

function LeftSidebar(props) {
  const { total, lethal, recovered } = props.total;

  return (
    <MDBCard
      className="left-panel"
      style={{ position: "absolute", opacity: 0.7 }}
    >
      <MDBListGroup>
        <MDBListGroupItem className="font-weight-bold light-blue-text">
          Захворіло всього: {total}
        </MDBListGroupItem>
        {
          <MDBListGroupItem>
            Лікуються: {total - lethal - recovered}
          </MDBListGroupItem>
        }
        <MDBListGroupItem>Летальні випадки: {lethal}</MDBListGroupItem>
        <MDBListGroupItem>Одужало: {recovered}</MDBListGroupItem>
        <MDBListGroupItem className="font-weight-bold dark-grey-text">
          <MDBIcon far icon="clock" className="pr-2" />
          <LastUpdatedInfo />
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCard>
  );
}
export default LeftSidebar;
