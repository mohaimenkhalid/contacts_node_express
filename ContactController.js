const Contact = require('./Contact')


exports.getAllContacts = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.json(contacts)
        })
        .catch(e => {
            res.json({
                message : 'Error Occurred'
            })
        })
}

exports.createContact = (req, res) => {
    let { name, email, phone } = req.body
    let contact = new Contact({
        name,
        email,
        phone
    })
    contact.save()
        .then(c => {
            console.log(c);
        })
        .catch(e => {
            res.json({
                message : 'Error Occurred'
            })
        })
}

exports.getContactById = (req, res) => {
    let { id } = req.params;
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            res.json({
                message : 'Error Occurred'
            })
        })
}

exports.updateContact = (req, res) => {
    let  { id }  = req.params;
    let { name, email, phone } = req.body;
    Contact.findOneAndUpdate(
        { _id : id },
        { $set: { name, email, phone }},
        {new: true}
        )
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e)
            res.json({
                message : 'Error Occurred'
            })
        })

}

exports.deleteContact = (req, res) => {
    let { id } = req.params;
    Contact.findByIdAndDelete({_id: id})
        .then(contact => {
            res.json({
                message: 'Deleted successfully!'
            })
        })
        .catch(e => {
            console.log(e)
            res.json({
                message : 'Error Occurred'
            })
        })
}