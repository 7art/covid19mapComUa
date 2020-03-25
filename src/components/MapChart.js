import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from "react-simple-maps";
import ukrAdmData from "../data/ukrAdmData.js";
import worldGeoJSON from "geojson-world-map";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
function MapChart() {
  return (
    <>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
}

export default MapChart;
