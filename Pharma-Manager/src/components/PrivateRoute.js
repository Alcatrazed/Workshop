import { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

function PrivateRoute({ ...rest }) {
    const { currentUser } = useContext(AuthContext);
    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    
    // If the user is authenticated, render the Outlet
    return <Outlet />;
}


export default PrivateRoute;
