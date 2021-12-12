var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController')

/* GET home page. */
router.get('/login', controller.login);
router.get('/register', controller.register);

module.exports = router;
