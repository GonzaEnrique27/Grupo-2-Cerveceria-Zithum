var express = require('express');
var router = express.Router();
let controller = require('../controllers/mainController')

/* GET home page. */
router.get('/', controller.home);

module.exports = router;
