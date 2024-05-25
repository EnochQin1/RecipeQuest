import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import '../../firebase-authentication.jsx';
import { editProile } from '../../components/editProfile.jsx'

export const handleEditConfirmation = (email, password, name, username, bio, image) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            //confirmed credentials, call method to do profile edit
            alert("Attempting to update profile details")
            editProile(email, name, username, bio, image)
        }).catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
            console.error('Error: ' + errorCode + ' ' + errorMessage)
        })
}