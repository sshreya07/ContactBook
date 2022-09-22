import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import { Navigate } from 'react-router-dom';
//we can use Navigate instead of Redirect in new versions of React

const PrivateRoute = ({ component: Component , ...rest }) => {

    const authContext = useContext(AuthContext);

    const { isAuthenticated, loading } = authContext;

  return ( !isAuthenticated && !loading ? (
        <Navigate to="/login" />
    ) : (
        <Component />
    )
)
}

export default PrivateRoute