import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AmplifyProvider } from "@aws-amplify/ui-react";

import { Amplify } from 'aws-amplify';

import awsconfig from './aws-exports';

import "@aws-amplify/ui-react/styles.css";
import theme from "./theme";
import {ThemeProvider} from "@mui/material";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AmplifyProvider>
      <ThemeProvider theme={theme}>
    <App />
      </ThemeProvider>
  </AmplifyProvider>
);
