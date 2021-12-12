var express = require('express');
var router = express.Router();
let controller = require('../controllers/productsController')

/* GET HOME page. */
router.get('/detail', controller.product)

//Crear y Eliminar producto
router.get('/crear', controller.formulario);
router.post('/create', controller.create)//giane
router.get('/delete', controller.quitarProducto);

//carrito
router.get('/cart', controller.productCart);




module.exports = router;
