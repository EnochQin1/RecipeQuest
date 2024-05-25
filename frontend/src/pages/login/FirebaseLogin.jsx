import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import '../../firebase-authentication.jsx';
import { Navigate, useNavigate } from 'react-router-dom';




    export const handleEmailPasswordSignIn = (email, password) => {
        return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                alert("successfully signed in as: " + user.email);
                resolve(1)
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error('Error: ' + errorCode + ' ' + errorMessage);
                alert("rejected");
                reject();
            });
        });
    };

    export const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((userCredential) => {
                alert("Successfully signed in");
                var user = userCredential.user;
                console.log("Sucessfuly logged in as: " + user.displayName)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Error: ' + errorCode + ' ' + errorMessage);
            });
    };
