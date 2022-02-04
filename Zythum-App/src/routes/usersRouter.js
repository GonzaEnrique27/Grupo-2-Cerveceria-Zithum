var express = require('express');
var router = express.Router();
let { login, logeo, logout, register, processRegister, profile} = require('../controllers/usersController');
let uploadAvatar = require('../middlewares/uploadUserFile');
let registerValidator = require('../validations/registerValidator');
let loginValidator = require('../validations/loginValidator');
let isUser = require('../middlewares/userCheck');

/* GET home page. */
/* router.get('/', controller.listUsers); */

//GET - Login
router.get('/login', login);
//POST - Login
router.post('/login', loginValidator, logeo);
//GET - Logout
router.get('/logout', logout);

//GET- Register
router.get('/register', register);
// POST - Reister
router.post('/register',uploadAvatar.single('image'), registerValidator , processRegister);

//GET - User Profile
/* router.get('/profile', isUser, profile); */

//

module.exports = router;