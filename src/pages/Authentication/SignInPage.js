import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; 

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const auth = getAuth();
    setError(null); // Reset the error state

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('sign in');
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

  const handleForgotPasswordClick = () => {
    setForgotPasswordDialogOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordDialogOpen(false);
  };

  
  const handleForgotPasswordSubmit = async () =>{
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent")
    console.log('Reset password logic here for email:', email);
    // Close the dialog after handling the logic
    handleForgotPasswordClose();
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
          <Button variant="text" color="primary" onClick={handleForgotPasswordClick}>
            Forgot Password
          </Button>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordDialogOpen} onClose={handleForgotPasswordClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address below, and we'll send you a link to reset your password.
          </DialogContentText>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleForgotPasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignInPage;
