/* const { Op } = require('sequelize');
const db = require('../database/models');

const Products = db.Product;

let controller = {
    detail: (req,res)=> {
        Products.findOne({
            where: {
                id: req.params.id
            }, */
            /* include: [{association: 'productImages'}] */
        /* })
        .then((product)=> {
            res.render('productDetail', {
                product,
                session: req.session
            })
        })
    }, */

    const fs = require('fs');

let { getProducts } = require('../database/dataBase')

let controller = {
    // Detail - Detail from one product
    detail: function(req,res){
        let idProduct = +req.params.id;
		let product = getProducts.find(product => product.id === idProduct);

        res.render('productDetail', {
            product,
            session: req.session
        })
    },
    
    productCart: function(req,res){
        res.render('productCart', {
            session: req.session
        })
    },
    
    search: (req,res) => {
        res.render('searchResult', {
            session: req.session
        })
    }
}

module.exports = controller;