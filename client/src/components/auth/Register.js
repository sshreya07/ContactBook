import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { history } from '../../App';

const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        name:'',
        email: '',
        password: '',
        password2: ''
    })

    const { setAlert } = alertContext;
    const { registerUser, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated){
            // redirect to the home page
            history.push('/');
            window.location.reload()
        }

        if(error === 'User already exists'){
            setAlert(error,'danger');
            clearErrors();
        }       

        //eslint-disable-next-line
    }, [error, isAuthenticated, history]);

    const { name, email, password, password2 } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name] : e.target.value});
    }

    const onSubmit = (e) => {
        if(name === '' || email === '' || password === '' || password2 === ''){
            setAlert('Please enter all fields', 'danger');
        }else if(password !== password2){
            setAlert('Passwords do not match','danger');
        }else{
            registerUser({ name, email, password });
            // setAlert('User Registered', 'success');
        }
        e.preventDefault();
    }

  return (
    <div className='form-container'>
        <h1>Account <span className='text-primary'>Register </span> </h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>Username</label>
                <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={password} minLength="6" onChange={onChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input type="password" name="password2" value={password2} minLength="6" onChange={onChange} />
            </div>
            <div className='form-group'>
                <button type="submit" value="Register" className='btn btn-block btn-primary'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register