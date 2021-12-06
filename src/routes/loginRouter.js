var express = require('express');
var router = express.Router();
let controller = require('../controllers/loginController')

/* GET home page. */
router.get('/', controller.login);

module.exports = router;
