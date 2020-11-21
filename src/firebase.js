import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDFPt34JP2OD-avASvm17U9lyLjA1dZSPY",
  authDomain: "sheet-50610.firebaseapp.com",
  databaseURL: "https://sheet-50610.firebaseio.com",
  projectId: "sheet-50610",
  storageBucket: "sheet-50610.appspot.com",
  messagingSenderId: "681587112891",
  appId: "1:681587112891:web:0d1e50869f9ad78103e29e"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();
