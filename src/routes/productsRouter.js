var express = require('express');
var router = express.Router();
let controller = require('../controllers/productsController');
let uploadFile = require('../middlewares/uploadProductFiles');

/* GET HOME page. */
router.get('/detail/:id', controller.detail)

//carrito
router.get('/cart', controller.productCart);

module.exports = router;
