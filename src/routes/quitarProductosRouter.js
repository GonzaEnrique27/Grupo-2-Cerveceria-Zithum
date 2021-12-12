var express = require('express');
var router = express.Router();
let controller = require('../controllers/quitarProductoController')

/* GET form page. */
router.get('/', controller.quitarProducto);

module.exports = router;