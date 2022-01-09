var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController');
let uploadFile = require('../middlewares/uploadUserFile');

/* GET home page. */
/* router.get('/', controller.listUsers); */
/* router.get('/:id', controller.profile); */
router.get('/login', controller.login);

router.get('/register', controller.register);


// POST
router.post('/logeo',controller.logeo);
router.post('/register',uploadFile.single('image'), controller.processRegister);

module.exports = router;
