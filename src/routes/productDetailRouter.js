var express = require('express');
var router = express.Router();
let controller = require('../controllers/productsController')

/* GET home page. */
router.get('/', controller.product)

module.exports = router;
