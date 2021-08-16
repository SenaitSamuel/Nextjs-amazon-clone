import firebase from "firebase";
import firestore from "firebase/firestore"; // for cloud firestore

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9VDCMKOFqmCG5weJrXasYKr3suFNiWHU",
  authDomain: "leather-watch.firebaseapp.com",
  projectId: "leather-watch",
  storageBucket: "leather-watch.appspot.com",
  messagingSenderId: "168526130693",
  appId: "1:168526130693:web:402af1b982668d43d6f66c",
  measurementId: "G-26P6Q2RQWE",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export default db;
