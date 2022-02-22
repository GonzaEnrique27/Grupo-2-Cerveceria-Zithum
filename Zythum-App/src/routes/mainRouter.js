var express = require('express');
var router = express.Router();
let { home } = require('../controllers/mainController');

/* GET home page. */
router.get('/', home);

module.exports = router;
