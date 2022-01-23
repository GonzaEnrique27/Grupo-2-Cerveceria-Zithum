const { check, body } = require('express-validator');
const { getUsers } = require('../data/dataBase');
const bcrypt = require('bcryptjs');

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
                if(bcrypt.compareSync(req.body.pass, user.password)){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }

        }).withMessage('Credenciales inválidas')
]