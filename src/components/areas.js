import React, { useState } from "react";
import {
  GeoJSON,
  Popup,
  FeatureGroup,
  Tooltip,
  CircleMarker,
  Marker
} from "react-leaflet";
import {
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBBtn,
  MDBContainer,
  MDBBox,
  MDBTypography,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import { Circle } from "leaflet";

export default function Areas({ feature, index }) {
  const cartographyColor = ["#525252", "#bdd7e7", "#6baed6", "#2171b5"];
  const [colorArea, setColorArea] = useState(cartographyColor[1]);
  // const [currentPos, setCurrentPos] = useState(null);

  // const onEachFeature = (feature, layer) => {
  //   layer.on({
  //     // mouseover: setColorArea(cartographyColor[2]),
  //     //mouseout: setColorArea(cartographyColor[1])
  //     //   click: this.clickToFeature.bind(this)
  //   });
  // };

  // function getColor(d) {
  //   return d > 1000
  //     ? "#800026"
  //     : d > 500
  //     ? "#BD0026"
  //     : d > 200
  //     ? "#E31A1C"
  //     : d > 100
  //     ? "#FC4E2A"
  //     : d > 50
  //     ? "#FD8D3C"
  //     : d > 20
  //     ? "#FEB24C"
  //     : d > 10
  //     ? "#FED976"
  //     : "#FFEDA0";
  // }

  function style(feature) {
    return {
      fillColor: colorArea, //getColor(feature.properties.objectid),
      weight: 0.5,
      opacity: 1,
      color: cartographyColor[0],
      //dashArray: "3",
      fillOpacity: 0.5
    };
  }
  //   <Popup autoPan={true}>
  //   <p>{feature.properties.name}</p>
  // </Popup>

  const tooltipView = (
    <Tooltip direction="right" offset={[-1, -2]} opacity={0.9}>
      <MDBPopoverHeader>{feature.properties.name}</MDBPopoverHeader>
      <MDBPopoverBody>
        <MDBTypography listUnStyled>
          <li className="deep-orange-text">
            Всього захворіло: {feature.properties.info.total}
          </li>
          <li className="indigo-text">
            За останню добу: +{feature.properties.info.today}
          </li>
          <li className="grey-text">
            Летальні віпадки: {feature.properties.info.lethal}
          </li>
          <li className="green-text border-bottom border-light">
            Одужало: {feature.properties.info.recovered}
          </li>
        </MDBTypography>
      </MDBPopoverBody>
    </Tooltip>
  );

  return (
    <FeatureGroup
      style={style}
      //   color={"yelo"}
      key={index}
      onmouseover={() => {
        setColorArea(cartographyColor[2]);
      }}
      onmouseout={() => {
        setColorArea(cartographyColor[1]);
      }}
      // onClick={e => {
      //   setCurrentPos(e.latlng);
      // }}
    >
      <GeoJSON
        key={index}
        data={feature}
        style={style}
        // onEachFeature={onEachFeature}
        // onclick={e => {
        //   this.setState(e.latlng);
        //   // console.log(e.latlng);
        // }}
      >
        <CircleMarker
          key={index}
          center={feature.properties.coordinates}
          fillColor={cartographyColor[3]}
          radius={10 * Math.log(feature.properties.info.total / 1)}
          fillOpacity={0.5}
          stroke={false}
        >
          {tooltipView}
        </CircleMarker>
        {tooltipView}
      </GeoJSON>
    </FeatureGroup>
  );
}

// {currentPos && (
//   <Popup position={currentPos}>
//     {feature.properties.name}:
//     <pre>{JSON.stringify(currentPos, null, 2)}</pre>
//   </Popup>
// )}
