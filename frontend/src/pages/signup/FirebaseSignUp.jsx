import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import '../../firebase-authentication.jsx';
import  {createUser} from '../../components/create.jsx'



const setCookie = (name, value) => {
    localStorage.setItem(name, value)
  }

    export const handleEmailPasswordSignUp = async (username, name, email, password, confirmPassword) => {
        return new Promise((resolve, reject) => {
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                reject(0);
                return;
            }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                userCredential.user.sendEmailVerification();
                console.log(userCredential.user)
                alert("successfully signed in as: " + user.email);
                createUser(username, name, user.email, "", false, false)
                resolve(1)
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        alert("Email already in use.  Please use a different email address.");
                        break;
                    case "auth/invalid-email":
                        alert("Invalid email. Please use a valid email address.");
                        break;
                    case "auth/weak-password": 
                        alert("Weak password. Your password must be over 6 characters.");
                        break;

                }
                reject(0)
            });
        });
    };

    export const handleGoogleSignUp = () => {
        return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((userCredential) => {
                alert("Successfully signed in");
                setCookie("userEmail", firebase.auth().currentUser.email)
                var user = userCredential.user;
                console.log("Sucessfuly logged in as: " + user.displayName)
                resolve(1)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Error: ' + errorCode + ' ' + errorMessage);
                reject(0)
            });
        });
    };


