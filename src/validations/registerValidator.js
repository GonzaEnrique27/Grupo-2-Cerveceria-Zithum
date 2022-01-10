const { check, body } = require('express-validator');
const { getUsers } = require('../data/dataBase');

module.exports = [

    check('name')
    .notEmpty()
    .withMessage('Debes ingresar tu nombre'),

    check('lastname')
    .notEmpty()
    .withMessage('Debes ingresar tu nombre'),

    check('email')
    .notEmpty()  
    .withMessage('Debes ingresar un e-mail') 
    .bail() 
    .isEmail()
    .withMessage('Debes ingresar un e-mail válido'),

    body('email').custom((value) => { //custom recibe como parámetro un collback, que recibe como parámetro el value 
        let user = getUsers.find(user => {
            return user.email == value //Si existe este usuario en nuestra base de datos
        })

        if(user){
            return false //En el caso de que no esté el usuario en la base de datos tirará el mensaje de que ya está registrado el email
        }else{
            return true
        }
    }).withMessage('Este email ya está registrado'),

    check('password')
    .notEmpty()
    .withMessage()
    .isLength({ 
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 carácteres'),

    body('password2').custom((value, {req}) => value !== req.body.password ? false : true) //Comparando contraseñas
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on') 
    .withMessage('Debes aceptar los términos y condiciones')
]