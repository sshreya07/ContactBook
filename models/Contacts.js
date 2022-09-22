const mongoose = require('mongoose');
const { schema } = require('./User');


//contact model
const ContactSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },

    name:{
        type: String,
        required: [true, 'Please add a name']
    },

    email:{
        type: String
    },

    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true
    },

    type: {
        type: String,
        enum: [
          'personal',
          'professional'
        ],
        default: 'personal'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('contact', ContactSchema)