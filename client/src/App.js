import React, { Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layouts/Alerts';
import ContactState from './context/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/rounting/PrivateRoute';
import {
  createBrowserHistory
} from 'history';

export const history =  createBrowserHistory();
//Routes are Switch from react-router-dom in new version of react
//elements are component 

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar/>
              <div className="container">
                <Alerts/>
                <Routes history={history}>    
                  <Route exact path="/" element={<PrivateRoute component={Home} />} />
                  <Route exact path="/about" element={<About/>} />
                  <Route exact path="/register" element={<Register/>} />
                  <Route exact path="/login" element={<Login/>} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
