import React, { useState } from "react";
import {
  Map as LeafletMap,
  GeoJSON,
  TileLayer,
  Popup,
  FeatureGroup
} from "react-leaflet";
import worldGeoJSON from "geojson-world-map";
import Areas from "./areas";
import ukrAdmData from "../data/ukrAdmData.js";

export default function Map() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const centerKyiv = [50.27, 30.3];
  const centerUa = [48.77, 31.87];
  let total = 0;

  const setInfo = feature => {
    total += feature.total;
    console.log(total);
  };

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
      <TileLayer url="https://api.mapbox.com/styles/v1/seart/ck85rvqc60fs01ioa3j1fw1w0/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VhcnQiLCJhIjoiY2s4NXBhcmV5MDkyZDNtb3Q0c2NpZ2F5dSJ9.R71WdPbLAuyCBFeBEznk5Q" />

      {ukrAdmData.features.map((feature, index, array) => {
        setInfo(feature.properties.info);
        return <Areas key={index} feature={feature} index={index} />;
      })}
    </LeafletMap>
  );
}
