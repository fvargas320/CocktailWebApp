import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {db} from "../../firebase";
import Typography from '@mui/material/Typography';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

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

}

  const handleSignUp = () => {
    // Reset the error state
    setError(null);


    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Update the user's profile with the display name
          await updateProfile(user, { displayName: username });

          await createUserDocument(user.uid);

          console.log('User created:', user);
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
