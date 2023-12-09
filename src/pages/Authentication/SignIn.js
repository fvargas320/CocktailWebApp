import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSignIn = () => {
    const auth = getAuth();
    setError(null); // Reset the error state

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("sign in");
        console.log(user);
        // Redirect to the home page
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          // Update the error state with a custom error message
          setError('Invalid email or password. Please try again.');
        } else {
          // For other errors, use the default error message
          setError(errorMessage);
        }

        console.error('Sign-in error:', errorCode, errorMessage);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '16px', color: '#333' }}>
          Sign In
        </Typography>
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
          onClick={handleSignIn}
          style={{ marginTop: '16px', marginBottom: '8px' }}
        >
          Sign In
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="text" color="primary">
              Sign Up
            </Button>
          </Link>
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
            <Button variant="text" color="primary">
              Forgot Password
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
