import React, { useEffect, useCallback } from "react";
import { Map as LeafletMap, TileLayer, withLeaflet } from "react-leaflet";
// import worldGeoJSON from "geojson-world-map";
import Feature from "./Feature";
import LeftPanel from "./LeftPanel";
// import ukrAdmData from "../data/ukrAdmData.js";
import UkraineData from "../data/UkraineData.js";

// const outer = [
//   [50.505, -29.09],
//   [52.505, 29.09]
// ];

export default function Map({ setTotal }) {
  // const [modal, setModal] = useState(false);
  // const [totalSick, setTotalSick] = useState(0);
  // const toggle = () => setModal(!modal);
  // const centerKyiv = [50.27, 30.3];

  const LeftPanelBar = withLeaflet(LeftPanel);
  const centerUa = [48.77, 31.87];

  const callbackSetTotal = useCallback(setTotal, []);
  const totalInfo = {
    total: 0,
    lethal: 0,
    newToday: 0,
    recovered: 0
  };

  const setInfo = feature => {
    totalInfo.total += feature.total;
    totalInfo.lethal += feature.lethal;
    totalInfo.newToday += feature.today;
    totalInfo.recovered += feature.recovered;
  };

  useEffect(() => {
    callbackSetTotal(totalInfo);
  }, [callbackSetTotal]);
  // useEffect(() => {
  //   setTotal(totalInfo);
  // }, [totalInfo.total]);
  // console.log(totalSick);
  return (
    <LeafletMap
      center={centerUa}
      zoom={6}
      maxZoom={8}
      minZoom={6}
      attributionControl={true}
      zoomControl={false}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/seart/ck85rvqc60fs01ioa3j1fw1w0/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VhcnQiLCJhIjoiY2s4NXBhcmV5MDkyZDNtb3Q0c2NpZ2F5dSJ9.R71WdPbLAuyCBFeBEznk5Q"
        zIndex={1}
      />
      {UkraineData.features.map((feature, index, array) => {
        {
          feature.properties.id !== 4 && setInfo(feature.properties.info);
        }
        return (
          <Feature key={"feature_" + index} feature={feature} index={index} />
        );
      })}
    </LeafletMap>
  );
}
