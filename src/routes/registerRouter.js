var express = require('express');
var router = express.Router();
let controller = require('../controllers/registerController')

/* GET home page. */
router.get('/', controller.register);

module.exports = router;