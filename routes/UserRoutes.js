const express = require('express')
// creamos el enrutador
const router = express.Router()

const {register} = require('../controllers/Users/UserController')

// http://localhost:300/users/register
router.post('/register',register)


module.exports = router
