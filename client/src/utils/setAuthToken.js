import axios from 'axios'
import React from 'react'

const setAuthToken = token => {
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token;
  }else{
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken