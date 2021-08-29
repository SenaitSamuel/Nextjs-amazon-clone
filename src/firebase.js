import firebase from "firebase";
import firestore from "firebase/firestore"; // for cloud firestore

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxbCNSXzUCAU5p0VuAb4iEnR1dfN_1-xc",
  authDomain: "amz-clone-nextjs.firebaseapp.com",
  projectId: "amz-clone-nextjs",
  storageBucket: "amz-clone-nextjs.appspot.com",
  messagingSenderId: "446780671753",
  appId: "1:446780671753:web:57486afb1a46c9d1f2f5d8",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export default db;
