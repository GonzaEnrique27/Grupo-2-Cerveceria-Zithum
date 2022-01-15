var express = require('express');
var router = express.Router();
let { login, logeo, register, processRegister} = require('../controllers/usersController');
let uploadFile = require('../middlewares/uploadUserFile');
let registerValidator = require('../validations/registerValidator');
let loginValidator = require('../validations/loginValidator');

/* GET home page. */
/* router.get('/', controller.listUsers); */
/* router.get('/:id', controller.profile); */

//GET - Login
router.get('/login', login);
//POST - Login
router.post('/login', loginValidator, logeo);

//GET- Register
router.get('/register', register);
// POST - Reister
router.post('/register',uploadFile.single('image'), registerValidator , processRegister);


module.exports = router;