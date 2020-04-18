import React, { useState, useEffect } from "react";
import firebase from "./FirebaseConfig";
import EditFeatureInfoInput from "./EditFeatureInfoInput";
import SpinnerPage from "./SpinnerPage";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";

function EditFeatureInfo() {
  const [loading, setloading] = useState(true);
  const [featureList, setFeatureList] = useState([]);
  const inputNames = ["total", "today", "lethal", "recovered"];
  useEffect(() => {
    const list = [];
    const areasRef = firebase
      .firestore()
      .collection("areas")
      .orderBy("id")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          list.push({
            idArea: +doc.id,
            ...doc.data(),
          });
        });
      })
      .then(() => {
        setFeatureList(list);
        setloading(false);
      });
    return () => areasRef;
  }, []);

  const changeHandler = (event) => {
    const id = event.target.dataset.id;
    const name = event.target.name;
    const value = +event.target.value;
    const update = {};
    update[`${name}`] = value;
    // console.log(update);
    firebase.firestore().collection("areas").doc(`${id}`).update(update);
  };
  console.log(featureList);
  return (
    <MDBContainer className="mt-5 text-center">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron>
            <h2 className="h1 display-3"> EDIT COVID-19 INFO</h2>
            <hr className="my-2" />
            {loading ? (
              <SpinnerPage />
            ) : (
              <MDBTable>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    <th>#</th>
                    <th>The names of the regions</th>
                    <th>Total</th>
                    <th>Today</th>
                    <th>Lethal</th>
                    <th>Recovered</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {featureList.map((item, idx, arr) => {
                    return (
                      <tr key={idx}>
                        <td>{item.id}</td>
                        <td>
                          <p className="font-weight-bold">{item.name}</p>
                        </td>
                        {inputNames.map((inputName) => {
                          return (
                            <EditFeatureInfoInput
                              key={"input_" + item.id + inputName}
                              dataid={item.idArea}
                              name={inputName}
                              propsValue={item[inputName]}
                              onChange={changeHandler}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            )}
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default EditFeatureInfo;
