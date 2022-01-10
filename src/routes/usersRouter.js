var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController');
let uploadFile = require('../middlewares/uploadUserFile');
const {body, validationResult} = require('express-validator')

//Validaciones

const validateCreateForm = ('users/register', [
    body('name', 'Ingrese un Nombre')
    .exists()
    .isLength({min:4}),
    body ('lastname','Ingrese un Apellido' )
    .exists()
    .isLength({min:4}),
    body('email', 'Ingrese un Email valido')
    .exists()
    .isEmail(),
    body('password','Se requiere una Contraseña de minimo 8 caracteres')
    .exists()
    .isLength({min:8}),
    body('confirm-password','Se requiere confirmacion de la Contraseña')
    .exists()
    .isLength({min:8}),
  ])




/* GET home page. */
/* router.get('/', controller.listUsers); */
/* router.get('/:id', controller.profile); */
router.get('/login', controller.login);

router.get('/register', controller.register);


// POST
router.post('/logeo',controller.logeo);
router.post('/register',uploadFile.single('image'), controller.processRegister);




module.exports = router;
