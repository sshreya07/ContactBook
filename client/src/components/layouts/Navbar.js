import React, { Fragment, useContext } from 'react'
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'; 

const Navbar = () => {

    const authContext = useContext(AuthContext);

    const { isAuthenticated, logoutUser, user } = authContext;

    const onLogout = () => {
        logoutUser();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.data.name} </li>
            <li>
                <a onClick={onLogout} href='#!'> 
                    <i className='fas fa-sign-out-alt'/><span className='hide-sm'> Logout </span> 
                </a> 
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
           <h1> <ContactsRoundedIcon/> Contact Keeper </h1>

           <ul>
               {isAuthenticated ? authLinks : guestLinks}
           </ul>
        </div>
    )
}

export default Navbar
