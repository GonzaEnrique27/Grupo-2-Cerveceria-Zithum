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
const dataBase = require('../database/dataBase');

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
    subcategory: (req, res) => {
        Subcategories.findByPk(req.params.subcategory, {
            include: [{
                association: 'products',
                include: [{
                    association: 'productImages'
                }]
            }]
        })
        .then((subcategory) => {
            Categories.findByPk(req.params.categoryId, {
                include: [{association: 'subcategories'}]
            })
            .then((category) => {
                res.render('subcategory', {
                    products: subcategory.products,
                    category,
                    subcategories: category.subcategories,
                    session: req.session
                })
            })
        })
    },

    productHome: (req,res)=>{
        Products.findAll({
            include: [
                {association: 'brand'}, 
                {association: 'size'}, 
                {association: 'taste'}, 
                {association: 'subcategory',
                include: [{association: 'category'}]
            }]
        })
        .then(product => {
            res.render('./index', {
                product,
                session: req.session
            })
        })
    },
    
    search: (req,res) => {
        res.render('searchResult', {
            session: req.session
        })
    }
}

module.exports = controller;