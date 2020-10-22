const Contact = require('./Contact')


exports.getAllContacts = (req, res) => {
    Contact.find()
    .then(contacts => {
        res.render('index', { contacts, error: {}})
    })
    .catch(e => {
        res.json({
            message : 'Error Occurred'
        })
    })
}

exports.createContact = (req, res) => {
    let { name, email, phone, id } = req.body
    let error = {}
    if (!name) {
        error.name = 'Please Provide Your Name'
    }
    if (!phone) {
        error.phone = 'Please Provide Your Phone Number'
    }
    if (!email) {
        error.email = 'Please Provide Your Email Address'
    }
    let isError = Object.keys(error).length > 0
    if(isError){
        Contact.find()
            .then(contacts => {
                res.render('index', { contacts, error: error})
            })
            .catch(e => {
                res.json({
                    message : 'Error Occurred'
                })
            })
    } else {

        if (id) {
            Contact.findOneAndUpdate(
                { _id : id },
                { $set: { name, email, phone }},
                {new: true}
            )
                .then(contact => {
                    Contact.find()
                        .then(contacts => {
                            res.render('index', { contacts, error: {}})
                        })
                        .catch(e => {
                            res.json({
                                message : 'Error Occurred'
                            })
                        })
                })
                .catch(e => {
                    console.log(e)
                    res.json({
                        message : 'Error Occurred'
                    })
                })

        } else {
            let contact = new Contact({
                name,
                email,
                phone
            })
            contact.save()
                .then(c => {
                    Contact.find()
                        .then(contacts => {
                            return res.render('index', { contacts, error: error})
                        })
                        .catch(e => {
                            res.json({
                                message : 'Contact not store'
                            })
                        })
                })
                .catch(e => {
                    res.json({
                        message : 'Error Occurred sfef'
                    })
                })
        }
    }
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
        .then(() => {
            Contact.find()
                .then(contacts => {
                    return res.render('index', { contacts, error: {}})
                })
                .catch(e => {
                    res.json({
                        message : 'Contact not store'
                    })
                })
        })
        .catch(e => {
            console.log(e)
            res.json({
                message : 'Error Occurred'
            })
        })
}