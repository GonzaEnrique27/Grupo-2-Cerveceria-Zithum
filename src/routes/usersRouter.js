var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController');
let uploadFile = require('../middlewares/uploadUserFile');
let registerValidator = require('../validations/registerValidator');

/* GET home page. */
/* router.get('/', controller.listUsers); */
/* router.get('/:id', controller.profile); */
router.get('/login', controller.login);

router.get('/register', controller.register);
router.post('/register',uploadFile.single('image'), registerValidator, controller.processRegister);

module.exports = router;
