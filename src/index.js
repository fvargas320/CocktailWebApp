// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
