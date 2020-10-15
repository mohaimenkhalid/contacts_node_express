const contacts = require('./Contact')


exports.getAllContacts = (req, res) => {
    res.json(contacts.getAllContact())
}

exports.createContact = (req, res) => {
    let {name, phone, email} = req.body
    let contact = contacts.createContact({
        name, email, phone
    })
    res.json(contact);
}

exports.getContactById = (req, res) => {
    let {id} = req.params
    id = parseInt(id);
    let contact = contacts.getContactById(id)
    return res.json(contact);
}

exports.updateContact = (req, res) => {
    let { id } = res.params;
    id = parseInt(id);
    let { name, email, phone } = res.body;
    let contact = contacts.updateContactById(id, {
        name,
        email,
        phone
    });
    res.json(contact);
}

exports.deleteContact = (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let contact = contacts.deleteContact(id);
    res.json(contact);
}