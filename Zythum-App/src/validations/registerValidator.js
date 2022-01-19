const { check, body } = require('express-validator');
const { getUsers } = require('../data/dataBase');

module.exports = [

    check('name')
    .notEmpty()
    .withMessage('Debes ingresar tu nombre'),

    check('lastname')
    .notEmpty()
    .withMessage('Debes ingresar tu apellido'),

    check('email')
    .notEmpty()  
    .withMessage('Debes ingresar un e-mail').bail() 
    .isEmail()
    .withMessage('Debes ingresar un e-mail válido'),

    body('email').custom((value) => { 
        let user = getUsers.find(user => {
            return user.email == value 
        })

        if(user){
            return false 
        }else{
            return true
        }
    }).withMessage('Este email ya está registrado'),

    check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña')
    .bail()
    .isLength({ 
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 carácteres'),
    
    check('password2')
    .notEmpty()
    .withMessage('Debe confirmar su contraseña'),

    body('password2').custom((value, {req}) => value !== req.body.password ? false : true) //Comparando contraseñas
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on') 
    .withMessage('Debes aceptar los términos y condiciones')
]