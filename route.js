const router = require('express').Router();
const { getAllContacts,
        createContact,
        getContactById,
        updateContact,
        deleteContact
        } = require('./ContactController')
router.get('/', getAllContacts)
router.post('/', createContact)
router.get('/:id', getContactById)
router.put('/:id', updateContact)
router.get('/delete/:id', deleteContact)

module.exports = router