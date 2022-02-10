const { check } = require('express-validator')

module.exports = [
    check('brand')
    .notEmpty()
    .withMessage('Debes elegir una marca'),

    check('category')
    .notEmpty()
    .withMessage('Debes elegir una categoría'),

    check('subcategory')
    .notEmpty()
    .withMessage('Debes elegir una subcategoría'),

    check('size')
    .notEmpty()
    .withMessage('Debes elegir un tamaño'),

    check('taste')
    .notEmpty()
    .withMessage('Debes elegir un sabor'),

    check('alcohol')
    .notEmpty()
    .withMessage('Debes ingresar el grado de alcohol').bail()
    .isNumeric()
    .withMessage('Sólo números'),
    
    check('density')
    .notEmpty()
    .withMessage('Debes ingresar el grado de densidad').bail()
    .isNumeric()
    .withMessage('Sólo números'),

    check('amargor')
    .notEmpty()
    .withMessage('Debes ingresar el amargor').bail()
    .isNumeric()
    .withMessage('Sólo números'),

    check('stock')
    .notEmpty()
    .withMessage('Debes ingresar el stock').bail()
    .isNumeric()
    .withMessage('Sólo números'),

    check('price')
    .notEmpty()
    .withMessage('Debes ingresar un precio').bail()
    .isNumeric()
    .withMessage('Sólo números'),

    check('discount')
    .isNumeric()
    .withMessage('Sólo números'),

    check('description')
    .notEmpty()
    .withMessage('Debes ingresar una descripción').bail()
    .isLength({ max: 500 })
    .withMessage('La descripción tiene que tener hasta 500 caracteres')
]