import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {db} from "../../firebase";
import Typography from '@mui/material/Typography';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection } from "firebase/firestore"; 

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  const createUserDocument = async (userId) => {

// Create the user document
await setDoc(doc(db, "users", userId), {
  userID: userId,
  favorites: []

});

// Create a reference to the "Lists" collection under the user document
const listsCollectionRef = collection(db, "users", userId, "Lists");

// Create a new document within the "Lists" collection (generating a new document ID)
await setDoc(doc(listsCollectionRef), {
  // Your fields here
});

}

  const handleSignUp = () => {
    // Reset the error state
    setError(null);
    

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log('User created:', user);
        console.log(user.uid)
        console.log(user.displayName)
        user.displayName = username;

        createUserDocument(user.uid);

        //user.uid
        //CALL FUNCTION TO CREATEA DOCUMENT
        // Redirect to the home page
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
          // Update the error state with a custom error message
          setError('Email is already in use. Please use a different email.');
        } else {
          // For other errors, use the default error message
          setError(errorMessage);
        }

        console.error('Sign-up error:', errorCode, errorMessage);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '16px', color: '#333' }}>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '12px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '12px' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        {error && (
          <Typography variant="body2" color="error" style={{ marginBottom: '16px' }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleSignUp}
          style={{ marginTop: '16px', marginBottom: '8px' }}
        >
          Create Account
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <Button variant="text" color="primary">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </Container>

  );
};

export default SignUpPage;
