let express = require('express');
let router = express.Router();
let controller = require('../controllers/adminController');
let uploadFile = require('../middlewares/uploadProductFiles');
const isAdmin = require('../middlewares/adminCheck');
const productFormValidator = require('../validations/productFormValidator');

//GET: dasboard ADMIN
router.get('/', isAdmin, controller.index);

//GET & POST: creacion de producto
router.get('/create', isAdmin, controller.create);
router.post('/create', isAdmin, uploadFile.single('image'), productFormValidator, controller.store)//giane

//GET & PUT: edicion de producto
router.get('/edit/:id', isAdmin, controller.edit);
router.put('/edit/:id', isAdmin, uploadFile.single('image'), productFormValidator, controller.update);

//DELETE de producto
router.delete('/delete/:id', controller.destroy);

module.exports = router;