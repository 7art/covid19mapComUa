import React, { useState } from "react";
import { GeoJSON, FeatureGroup, Tooltip, CircleMarker } from "react-leaflet";
import { MDBPopoverBody, MDBPopoverHeader, MDBTypography } from "mdbreact";

export default function Feature({ feature, featureList }) {
  const cartographyColor = ["#525252", "#bdd7e7", "#6baed6", "#2171b5"];
  const [colorArea, setColorArea] = useState(cartographyColor[1]);

  function style(feature) {
    return {
      fillColor: colorArea,
      weight: 0.5,
      opacity: 1,
      color: cartographyColor[0],
      fillOpacity: 0.5,
    };
  }

  const tooltipView = (
    <Tooltip direction="right" offset={[-1, -2]} opacity={0.9}>
      <MDBPopoverBody>
        <MDBPopoverBody>
          <MDBPopoverHeader>{featureList[0].name}</MDBPopoverHeader>
          <MDBTypography listUnStyled>
            <li className="deep-orange-text">
              Всього захворіло: {featureList[0].total}
            </li>
            <li className="indigo-text">
              Лікуються:{" "}
              {featureList[0].total -
                featureList[0].lethal -
                featureList[0].recovered}
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
      key={feature.properties.id}
      onmouseover={() => {
        setColorArea(cartographyColor[2]);
      }}
      onmouseout={() => {
        setColorArea(cartographyColor[1]);
      }}
    >
      {tooltipView}
      <GeoJSON
        key={feature.properties.id}
        data={feature}
        style={style}
        //10 * Math.log(feature.properties.info.total / 1) featureList[0].total / 3
      >
        <CircleMarker
          key={feature.properties.id}
          center={feature.properties.coordinates}
          fillColor={cartographyColor[3]}
          radius={
            featureList[0].total > 400
              ? featureList[0].total > 1000
                ? featureList[0].total / 38
                : featureList[0].total / 28
              : featureList[0].total / 19
          }
          fillOpacity={0.5}
          stroke={false}
        ></CircleMarker>
      </GeoJSON>
    </FeatureGroup>
  );
}
