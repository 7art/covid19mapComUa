import React, { useEffect, useState } from "react";
import firebase from "./FirebaseConfig";
import dateFormat from "dateformat";
const LastUpdatedInfo = () => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchData = fetchLastUpdateData();
    return () => fetchData;
  }, []);

  const updateLastData = () => {
    const update = { data: new Date() };
    firebase
      .firestore()
      .collection("lastUpdateData")
      .doc("data")
      .update(update);
    // console.log("updateLastData", update);
  };

  const fetchDataInfo = () => {
    firebase
      .firestore()
      .collection("areas")
      .orderBy("id")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          fetch(
            `https://www.trackcorona.live/api/cities/${doc.data().trackname}`
          )
            .then((response) => response.json())
            .then((city) => {
              const trackData = {
                total: city.data[0].confirmed,
                lethal: city.data[0].dead,
                recovered: city.data[0].recovered,
              };
              updateInfo(+doc.id, trackData);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .then(() => {
        updateLastData();
      });
  };

  const fetchLastUpdateData = () => {
    firebase
      .firestore()
      .collection("lastUpdateData")
      .orderBy("data")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let time = doc.data().data;
          let date = time.toDate();

          setDate(date);
          const dif =
            (new Date().getTime() - new Date(date).getTime()) /
            (1000 * 60 * 60);
          dif > 2 && fetchDataInfo();

          console.log(dif);
        });
      });
  };

  const updateInfo = (id, update) => {
    firebase.firestore().collection("areas").doc(`${id}`).update(update);
  };

  return <>{date && dateFormat(date, "HH:MM  yyyy.mm.dd")}</>;
};
export default LastUpdatedInfo;
