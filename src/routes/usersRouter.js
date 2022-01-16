var express = require('express');
var router = express.Router();
let { login, logeo, logout, register, processRegister, profile} = require('../controllers/usersController');
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
//GET - Logout
router.get('/logout', logout);

//GET- Register
router.get('/register', register);
// POST - Reister
router.post('/register',uploadFile.single('image'), registerValidator , processRegister);

//GET - User Profile
router.get('/profile', profile);

module.exports = router;