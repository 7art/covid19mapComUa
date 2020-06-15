import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const settings = { timestampsInSnapshots: true };

var config = {
  apiKey: "AIzaSyDYC0puQPC5ttIgxzIA-RBsgzDQJjMT_2I",
  authDomain: "coronavirus192020.firebaseapp.com",
  databaseURL: "https://coronavirus192020.firebaseio.com",
  projectId: "coronavirus192020",
  storageBucket: "coronavirus192020.appspot.com",
  messagingSenderId: "276434118614",
  appId: "1:276434118614:web:c909851e2677130cbb6677",
};

firebase.initializeApp(config);

// firebase.firestore().settings(settings);

// const getFeatures = () => {};

export default firebase;
