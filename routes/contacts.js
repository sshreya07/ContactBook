const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
    getContacts,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contacts');

const { check } = require('express-validator');


router.route('/')
    .get(protect , getContacts)
    .post(protect, [
        check('name', 'Please add name').not().isEmpty(),
        check('phone', 'Please add phone').not().isEmpty()
    ] , createContact);


router.route('/:id')
    .put(protect, updateContact)
    .delete(protect, deleteContact)

module.exports = router;