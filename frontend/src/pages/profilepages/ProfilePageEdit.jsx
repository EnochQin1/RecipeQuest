import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import profileIconTransparent from '../../images/UserProfileTransparent.png';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import ImageUpload from '../../components/imageUpload.jsx';
import { handleEditConfirmation } from './FirebaseEdit'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { useNavigate } from 'react-router-dom';
import { deleteProfileFirebase } from './DeleteUserFirebase.jsx'
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NavBar from '../../components/navBar.jsx';
import TextField from '@mui/material/TextField';


function ProfilePageEdit() {

  const [email, setEmail] = React.useState(localStorage.getItem("userEmail"));
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [originalName, setOName] = useState('')
  const [originalUsername, setOUsername] = useState('')
  const [originalBio, setOBio] = useState('')
  const [privacy, setPrivate] = useState(true)
  const [originalPrivacy, setOPrivate] = useState(true)

  const [password, setPassword] = useState('');
  const [passwordConfirmationRequired, setIsPasswordConfirmationRequired] = useState(false);
  const [open, setOpen] = useState(false);

  var firstTime = true

  const editing = async () => {
    //alert("Update Succesful")
    if (fileTesting != null) { //image here
      alert(fileTesting)
      const formData = new FormData()
      if (name != originalName && name != '') {
        formData.append("Name", name)
      }
      if (username != originalUsername && username != '') {
        formData.append("Username", username)
      }
      if (bio != originalBio && bio != '') {
        formData.append("Bio", bio)
      }
      if (privacy != originalPrivacy) {
        formData.append("Private", privacy)
      }
      formData.append("Image", "TBR")
      formData.append("productImage", fileTesting)
      const response = await fetch('api/users/emailImage/' + email, {
        method: 'PATCH',
        body: formData
      }).catch(error => {
        console.error('Error', error)
      })

      if (await response.ok) {
        alert("Success")
        window.location.href = "/profile-page"
      } else {
        alert("Failed to update")
      }
    } else { //No image here
      var fields = {}
      if (name != originalName && name != '') {
        fields["Name"] = name
      }
      if (username != originalUsername && username != '') {
        fields["Username"] = username
      }
      if (bio != originalBio && bio != '') {
        fields["Bio"] = bio
      }
      if (privacy != originalPrivacy) {
        fields["Private"] = privacy
      }
      const response = await fetch('api/users/emailData/' + email, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      }).catch(error => {
        console.error('Error', error)
      })

      if (await response.ok) {
        alert("Success")
        window.location.href = "/profile-page"
      } else {
        alert("Failed to update")
      }
    }
  }

  const confirmUpdate = async () => {
    if (password != '') {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          editing()
        })
        .catch(() => {
          alert("Incorrect Password")
        })
    } else {
      alert("Enter password to confirm edits")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users/email/' + localStorage.getItem("userEmail"));
      const data = await response.json();
      if (response.ok) {
        setOName(data["Name"]);
        setName(data["Name"])
        setOUsername(data["Username"]);
        setUsername(data["Username"])
        setOBio(data["Bio"]);
        setBio(data["Bio"])
        setOPrivate(data["Private"])
        setPrivate(data["Private"])
      }
    }

    if (firstTime) {
      fetchData()
      firstTime = false
    }
  }, [])

  const [fileTesting, setFileTesting] = React.useState(null)
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    setFileTesting(e.target.files[0])
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setPassword("");
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleConfirm = () => {
    confirmUpdate();
    handleClose();
  }




  return (
    <div>
      <NavBar />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Account Editing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password to update profile details
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant='standard'
            type='password'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Form style={{ marginTop: 300 }}>
        <Row className="Profile Information" style={{ marginTop: -100 }}>
          <Form.Group as={Col} controlId="editProfilePicture" style={{ marginTop: -20 }}>

            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{ display: 'none' }}
            />

            <img ref={uploadedImage} width='100px' height='100px' onClick={() => imageUploader.current.click()} />

          </Form.Group>

          <Form.Group as={Col} controlId="editName" style={{ marginLeft: 55 }}>
            <Form.FloatingLabel
              controlId="floatinginput"
              label="Name"
              className="name"
            >
              <Form.Control
                style={{ fontSize: 14, fontFamily: "Roboto", width: 250 }}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Basic Name"
                value={name}
              />
            </Form.FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="editUsername">
            <Form.FloatingLabel
              controlId="floatinginput"
              label="Username"
              className="username"
            >
              <Form.Control
                style={{ fontSize: 14, fontFamily: "Roboto", width: 250 }}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Basic Username"
                value={username}
              />
            </Form.FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="confirmChanges">
            <style type='text/css'>
              {`
                    .btn-flat {
                    background-color: #EC7765;
                    color: white;
                    fontSize: 14;
                    fontFamily: Roboto;
                    }
                    `}
            </style>
            <Button style={{ width: 200, marginTop: 10 }}
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                handleOpen();
                setIsPasswordConfirmationRequired(true);
              }}
              variant='flat'
              type='submit'>Update Account</Button>
          </Form.Group>
          {/*
          {passwordConfirmationRequired ? (
            <Form.Group as={Col} controlId="confirmPassword">
              <Form.FloatingLabel
                controlId="floatinginput"
                label="Password"
                className="password"
              >
                <Form.Control
                  style={{ fontSize: 14, fontFamily: "Roboto", width: 250 }}
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.FloatingLabel>
              <Button
                style={{ width: 200, marginTop: 10 }}
                onClick={() => confirmUpdate()}
                variant='flat'
                type='button'
              >
                Confirm
              </Button>
            </Form.Group>
          ) : null} */}
        </Row>

        <Row className='Edit-Bio' style={{ marginLeft: -35 }}>

          <Form.Group as={Col} controlId="profile-visiblity">

            <InputLabel id='profile-vis-label' sx={{ fontSize: 14, fontFamily: 'Roboto', width: 150, marginTop: 1.5 }}>Profile Visibility</InputLabel>

            <Select
              labelId='profile-vis-label'
              id='profile-vis'
              value={privacy}
              label='Profile Visibility'
              onChange={(e) => setPrivate(e.target.value)}
              sx={{ width: 150, fontSize: 14, fontFamily: 'Roboto' }}
            >
              <MenuItem value={false}>Public</MenuItem>
              <MenuItem value={true}>Private</MenuItem>
            </Select>
          </Form.Group>

          <Form.Group as={Col} controlId="editBio" style={{ marginLeft: -575 }}>
            <Form.FloatingLabel
              controlId="floatinginput"
              label="Bio"
              className="bio"
            >
              <Form.Control
                style={{ fontSize: 14, fontFamily: "Roboto", width: 525, height: '12vh' }}
                onChange={(e) => setBio(e.target.value)}
                type="text"
                placeholder="Basic Bio"
                value={bio}
              />
            </Form.FloatingLabel>
          </Form.Group>
        </Row>

      </Form>
    </div>
  );
}

export default ProfilePageEdit;