import React, { useEffect, useState } from "react";
import firebase from "./FirebaseConfig";
export const TestFetch = () => {
  //   useEffect(() => {
  //     const list = [];
  //     const areasRef = firebase
  //       .firestore()
  //       .collection("areas")
  //       .orderBy("id")
  //       .get()
  //       .then((snapshot) => {
  //         snapshot.forEach((doc) => {
  //           fetch(
  //             `https://www.trackcorona.live/api/cities/${doc.data().trackname}`
  //           )
  //             .then((response) => response.json())
  //             .then((city) => {
  //               const trackData = {
  //                 total: city.data[0].confirmed,
  //                 lethal: city.data[0].dead,
  //                 recovered: city.data[0].recovered,
  //               };
  //               updateInfo(+doc.id, trackData);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         });
  //       })
  //       .then(() => {
  //         // setFeatureList(list);
  //         // setloading(false);
  //       });
  //     return () => areasRef;
  //   }, []);
  const [update, setUpdete] = useState(false);
  useEffect(() => {
    const areasRef = firebase
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
        // setFeatureList(list);
        // setloading(false);
      });
    return () => areasRef;
  }, [update]);

  const updateInfo = (id, update) => {
    firebase.firestore().collection("areas").doc(`${id}`).update(update);
  };

  return (
    <div className="container">
      <button type="button" onClick={() => setUpdete(true)}>
        Update Data
      </button>
    </div>
  );
};
