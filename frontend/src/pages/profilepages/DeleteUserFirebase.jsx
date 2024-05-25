import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import '../../firebase-authentication.jsx';
import { deleteProfile } from '../../components/deleteProfile.jsx';

  export const deleteUser = async (navigate) => {
    try {
      const user = firebase.auth().currentUser
      const confirmDelete = window.confirm("Are you sure you want to delete your account?");
      if (confirmDelete) {
        user.delete();
        deleteProfile(localStorage.getItem("userEmail"));
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };



