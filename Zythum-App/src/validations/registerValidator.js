const { check, body } = require('express-validator');
const db = require('../database/models');
const Users = db.User;

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('Debes ingresar tu nombre').bail()
    .isLength({min: 2})
    .withMessage('Mínimo 2 caracteres'),

    check('lastname')
    .notEmpty()
    .withMessage('Debes ingresar tu apellido').bail()
    .isLength({min: 2})
    .withMessage('Mínimo 2 caracteres'),

    check('email')
    .notEmpty()  
    .withMessage('Debes ingresar un e-mail').bail() 
    .isEmail()
    .withMessage('Debes ingresar un e-mail válido').bail()
    .custom((value) => { 
        return Users.findOne({
            where: {
                email: value,
            }
        })
        .then((user) => {
            if(user){
                return Promise.reject('Email ya registrado')
            }
        })
    }),

    check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña')
    .bail()
    .isLength({ 
        min: 8,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 8 y 12 carácteres'),
    
    check('password2')
    .notEmpty()
    .withMessage('Debe confirmar su contraseña').bail()
    .custom((value, {req}) => value !== req.body.password ? false : true) //Comparando contraseñas
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on') 
    .withMessage('Debes aceptar los términos y condiciones')
]