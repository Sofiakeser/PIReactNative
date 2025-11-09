import app from 'firebase/app';
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCOAxv3tbRWB2dfPW-wNUaCW4HjyNyYqSo",
  authDomain: "bdreactnative-83105.firebaseapp.com",
  projectId: "bdreactnative-83105",
  storageBucket: "bdreactnative-83105.firebasestorage.app",
  messagingSenderId: "767681131965",
  appId: "1:767681131965:web:b45402f23a278e971e0ed4"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();