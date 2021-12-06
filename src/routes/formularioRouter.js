var express = require('express');
var router = express.Router();
let controller = require('../controllers/formularioController')

/* GET form page. */
router.get('/', controller.formulario);

module.exports = router;