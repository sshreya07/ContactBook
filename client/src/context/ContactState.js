import React , { useReducer } from 'react';
import {v4 as uuid} from 'uuid'   //just to generate random id coz we gonna work with some hard coded data before we deal with our backend data
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    SET_ALERT,
    SET_CURRENT,
    REMOVE_ALERT,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Get Contacts
    const getContacts = async () => {
        //contact.id = uuid(); //not needed anymore used for hard coded data
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.get('/api/contacts', config);
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Add Contact
    const addContact = async contact => {
        //contact.id = uuid(); //not needed anymore used for hard coded data
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact , config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
            getContacts();
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Delete Contact
    const deleteContact = async id => {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.delete(`/api/contacts/${id}`, config)
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    //Set Current Contact
    const setCurrent = contact => {

        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    //Clear Current Contact
    const clearCurrent = () => {

        dispatch({
            type: CLEAR_CURRENT
        })
    }

    //Filter Contacts
    const filterContacts = text => {

        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //Clear Filter 
    const clearFilter = () => {

        dispatch({
            type: CLEAR_FILTER,
        })
    }

    return (
        <ContactContext.Provider 
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts
        }}>
            
            {props.children}
        </ContactContext.Provider>
    )
}


export default ContactState;