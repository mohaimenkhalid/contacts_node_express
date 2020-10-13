const router = require('express').Router();
const {getAllContacts, createContact, getContactById} = require('./ContactController')
router.get('/', getAllContacts)
router.post('/', createContact)
router.get('/:id', getContactById)
// router.put('/:id')
// router.delete('/:id')

module.exports = router