import React, { useContext, useState, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { history } from '../../App';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { isAuthenticated, clearErrors, loginUser, error } = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;
    
    useEffect(() => {
        if(isAuthenticated){
            // redirect to the home page
            history.push('/');
            window.location.reload()
        }

        if(error === 'Invalid Credentials'){
            setAlert(error,'danger');
            clearErrors();
        }       

        //eslint-disable-next-line
    }, [error, isAuthenticated, history]);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name] : e.target.value});
    }

    const onSubmit = (e) => {
        if(email === '' || password === ''){
            
            setAlert('Please enter all fields', 'danger');
        }else{
            loginUser({email, password});
            // setAlert('User Logged In', 'success');
        }
        e.preventDefault();
    }

  return (
    <div className='form-container'>
        <h1>Account <span className='text-primary'>Login </span> </h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <div className='form-group'>
                <button type="submit" value="Login" className='btn btn-block btn-primary'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login