var express = require('express');
var router = express.Router();
let controller = require('../controllers/productsController')

/* GET HOME page. */
router.get('/detail/:id', controller.detail)

//Crear y Eliminar producto
router.get('/crear', controller.formulario);
router.post('/create', controller.create)//giane

//GET & PUT: edicion de producto
router.get('/edit/:id', controller.edit);
router.put('/edit/:id', controller.update);

//DELETE: implementado en la edicion, luego mover al dashboard
router.delete('/delete/:id', controller.destroy);

//carrito
router.get('/cart', controller.productCart);




module.exports = router;
