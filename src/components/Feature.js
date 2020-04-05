import React, { useState } from "react";
import { GeoJSON, FeatureGroup, Tooltip, CircleMarker } from "react-leaflet";
import { MDBPopoverBody, MDBPopoverHeader, MDBTypography } from "mdbreact";

export default function Feature({ feature, featureList, index }) {
  console.log(featureList);
  // const featureList = { total: 0, lethal: 0, today: 0, recovered: 0 };

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
      fillOpacity: 0.5,
    };
  }

  const tooltipView = (
    <Tooltip
      // className={"seat-tooltip"}
      direction="right"
      offset={[-1, -2]}
      opacity={0.9}
    >
      <MDBPopoverBody>
        <MDBPopoverBody>
          <MDBPopoverHeader>{featureList[0].name}</MDBPopoverHeader>
          <MDBTypography listUnStyled>
            <li className="deep-orange-text">
              Всього захворіло: {featureList[0].total}
            </li>
            <li className="indigo-text">
              За останню добу: +{featureList[0].today}
            </li>
            <li className="grey-text">
              Летальні віпадки: {featureList[0].lethal}
            </li>
            <li className="green-text border-bottom border-light">
              Одужало: {featureList[0].recovered}
            </li>
          </MDBTypography>
        </MDBPopoverBody>
      </MDBPopoverBody>
    </Tooltip>
  );

  return (
    <FeatureGroup
      style={style}
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
        //10 * Math.log(feature.properties.info.total / 1)
      >
        <CircleMarker
          key={index}
          center={feature.properties.coordinates}
          fillColor={cartographyColor[3]}
          radius={featureList[0].total / 3}
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
