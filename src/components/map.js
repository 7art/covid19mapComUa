import React, { useEffect, useState } from "react";
import { Map as LeafletMap, TileLayer, withLeaflet } from "react-leaflet";
// import worldGeoJSON from "geojson-world-map";
import Feature from "./Feature";
import LeftSidebar from "./LeftSidebar";
// import ukrAdmData from "../data/ukrAdmData.js";
import UkraineData from "../data/UkraineData.js";

import firebase from "./FirebaseConfig";
import SpinnerPage from "./SpinnerPage";

export default function Map() {
  // const centerKyiv = [50.27, 30.3];
  // const f = useFeatures();
  const LeftPanel = withLeaflet(LeftSidebar);
  const centerUa = [48.77, 31.87];

  const [featureList, setFeatureList] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalInfo, setTotalInfo] = useState({
    total: 0,
    lethal: 0,
    today: 0,
    recovered: 0,
  });

  useEffect(() => {
    const list = [];
    const ref = firebase
      .firestore()
      .collection("areas")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          list.push({
            // id: doc.id,
            id: doc.data().id,
            ...doc.data(),
          });

          doc.data().id !== 25 &&
            setTotalInfo({
              ...totalInfo,
              total: (totalInfo.total += doc.data().total),
              lethal: (totalInfo.lethal += doc.data().lethal),
              today: (totalInfo.today += doc.data().today),
              recovered: (totalInfo.recovered += doc.data().recovered),
            });
          // setTotalInfo((t) => {
          //   return {
          //     total: (t.total += doc.data().total),
          //     lethal: (t.lethal += doc.data().lethal),
          //     today: (t.today += doc.data().today),
          //     recovered: (t.recovered += doc.data().recovered),
          //   };
          // });
        });
      })
      .then(() => {
        setFeatureList(list);
        setloading(false);
      });
    return () => ref;
  }, []);

  // console.log(totalInfo);
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
      {loading ? (
        <SpinnerPage />
      ) : (
        UkraineData.features.map((feature, index, array) => {
          return (
            <Feature
              key={"feature_" + index}
              feature={feature}
              featureList={featureList.filter(
                (item) => item.id === feature.properties.id
              )}
            />
          );
        })
      )}
      {!loading && <LeftPanel total={totalInfo} />}
    </LeafletMap>
  );
}
