// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";

import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAitDsZiYGgLW81z6ooJeLpf20GX2XdK3M",

  authDomain: "recipequest-f1347.firebaseapp.com",

  projectId: "recipequest-f1347",

  storageBucket: "recipequest-f1347.appspot.com",

  messagingSenderId: "109365957055",

  appId: "1:109365957055:web:81802370f0542074c4d10a",

  measurementId: "G-XYDXN8SJ6V"

};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//const app = initializeApp(getAuth);
