const { check, body } = require('express-validator');
const { getUsers } = require('../data/dataBase');

module.exports = [

    check('email')
    .notEmpty()
    .withMessage('Debes ingresar tu email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes ingresar tu contraseña'),

    body('custom')
        .custom((value, {req}) => {
            let user = getUsers.find(user => user.email == req.body.email);

            if(user){
                if(user.pass === req.body.pass){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }

        }).withMessage('Credenciales inválidas')
]