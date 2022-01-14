var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController');
let uploadFile = require('../middlewares/uploadUserFile');
let registerValidator = require('../validations/registerValidator');
const { check } = require('express-validator');

/* GET home page. */
/* router.get('/', controller.listUsers); */
/* router.get('/:id', controller.profile); */
router.get('/login', controller.login);

router.get('/register', controller.register);


// POST
router.post('/login', [
    check('email').isEmail().withMessage('Email Invalido'),
    check('password').isLength({min:8}).withMessage('La contraseña debera tener minimo 8 caracteres')
],controller.logeo);

router.post('/register',uploadFile.single('image'), registerValidator , controller.processRegister);




module.exports = router;
