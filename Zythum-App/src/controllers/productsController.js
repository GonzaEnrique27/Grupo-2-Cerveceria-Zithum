const fs = require('fs');

let { getProducts } = require('../data/dataBase')

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
    

}

module.exports = controller;