var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController')

// GET
router.get('/login', controller.login);
router.get('/register', controller.register);

// POST
router.post('/logeo',controller.logeo);

module.exports = router;
