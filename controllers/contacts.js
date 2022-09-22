const User = require('../models/User');
const { validationResult } = require('express-validator');
const Contact = require('../models/Contacts');


//@desc     Get all contacts
//@routes   GET request from /api/contacts
//@access   Private
exports.getContacts = async (req, res, next) => {

    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1});

        res.status(200).json({
            success: true,
            contacts
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            msg: 'server error'
        })
    }

}


//@desc     Create new contacts
//@routes   POST request from /api/contacts
//@access   Private
exports.createContact = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id); //extracting user id from JWT by protecting the route

    req.body.user = user.id;

    try {
        const contact = await Contact.create(req.body);             //Create data in our database
        res.status(201).json({success: true, data:contact});

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: `${err.message}`
        })
    }

}


//@desc     Update a contact
//@routes   PUT request from /api/contacts/:id
//@access   Private
exports.updateContact = async(req, res, next) => {

    let contact = await Contact.findById(req.params.id)
    
    //make sure user is contact owner
    if(contact.user.toString() !== req.user.id){
        return res.status(401).json({
            success: false,
            msg:  `User has no Authorizations for updation of contact`
        })
    }

    contact = await Contact.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({success: true, data: contact});

}


//@desc     Delete a contact
//@routes   DELETE request from /api/contacts/:id
//@access   Private
exports.deleteContact = async( req, res, next) => {

    let contact = await Contact.findById(req.params.id)
    
    //make sure user is contact owner
    if(contact.user.toString() !== req.user.id){
        return res.status(401).json({
            success: false,
            msg: `User has no Authorizations for deletion of contact`
        })
    }

    await contact.remove();

    res.status(200).json({success: true, data: {}});
}