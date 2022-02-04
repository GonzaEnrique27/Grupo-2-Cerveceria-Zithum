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