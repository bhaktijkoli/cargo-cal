import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyArZ_AEY43mdV_TzxuQf-075IAXPQR0CgA",
  authDomain: "uniquearrange-7efe9.firebaseapp.com",
  databaseURL: "https://uniquearrange-7efe9.firebaseio.com",
  projectId: "uniquearrange-7efe9",
  storageBucket: "uniquearrange-7efe9.appspot.com",
  messagingSenderId: "339059280072"
};
firebase.initializeApp(config);

window.firebase = firebase;
