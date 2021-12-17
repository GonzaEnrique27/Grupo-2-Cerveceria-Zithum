let express = require('express');
let router = express.Router();
let controller = require('../controllers/adminController');
let uploadFile = require('../middlewares/uploadProductFiles');

//GET: dasboard ADMIN
router.get('/', controller.index);

//GET & POST: creacion de producto
router.get('/create', controller.create);
router.post('/create', uploadFile.single('image'), controller.store)//giane

//GET & PUT: edicion de producto
router.get('/edit/:id', controller.edit);
router.put('/edit/:id', uploadFile.single('image') ,controller.update);

//DELETE de producto
router.delete('/delete/:id', controller.destroy);

module.exports = router;