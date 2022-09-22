import React, {useContext} from 'react'
import ContactContext from '../../context/contactContext';

const ContactItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    const onUpdate = () => {
        setCurrent(contact);
    }


    return (
        <div className="card bg-light">
            <h3 className="text-left text-primary">
                {name} 
                <span style={{float:'right', fontSize:'12px'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')} >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span> 
            </h3>

            <small>
            <ul className="list">
                    {email && (
                        <li><i className="far fa-envelope-open"></i>&ensp;{email}</li>
                    )}
                    {phone && (
                        <li><i className="fas fa-phone"></i>&ensp;{phone}</li>
                    )}
            </ul>
            </small>

            <p>
                <button className='btn btn-dark btn-sm' onClick={onUpdate}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

export default ContactItem
