import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

function PrivateRoute({ element: Element, ...rest }) {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return user ? <Element {...rest} /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
