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

export default (state, action) => {

    switch(action.type){
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload.contacts,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload.data],
                loading: false
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload.data : contact),
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload ),
                loading: false
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            };
        case FILTER_CONTACTS:
            return {
                ...state, //filter: HigherOrderFunction just like map and forEach, return a array 
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');    //gi: global insensitive(used for ingnoring case sensitive feature)
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null,
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }

}