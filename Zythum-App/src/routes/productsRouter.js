let express = require('express');
let router = express.Router();
const { detail, allProducts, productCart, category, search} = require('../controllers/productsController');
let uploadFile = require('../middlewares/uploadProductFiles');

/* GET - All products */
router.get('/', allProducts);

/* GET - Detalle de producto */
router.get('/detail/:id', detail);

/* GET - List of products */
router.get('/category/:id', category)

/* GET - List of product (Subcategories) */
//router.get('/subcategory/:subcategory/:categoryId', controller.subcategory)

/* GET - Search products */
router.get('/search', search)

//carrito
router.get('/cart', productCart);

module.exports = router;
