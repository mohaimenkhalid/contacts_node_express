const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    }
})

const Contact = model('Contact', contactSchema)

module.exports = Contact