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
/////////////////////////////////////////////////////
const db = require('../database/models');

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Brands = db.Brand;
const Sizes = db.Size;
const Tastes = db.Taste;


let controller = {
    // Detail - Detail from one product
    detail: function(req,res){
        let productId = +req.params.id;
        Products.findByPk(productId, {
            include: [
                {association: 'brand'}, 
                {association: 'size'}, 
                {association: 'taste'}, 
                {association: 'subcategory',
                include: [{association: 'category'}]
            }]
        })
        .then(product => {
            Products.findAll({
                include: [
                    {association: 'brand'}, 
                    {association: 'size'}, 
                    {association: 'taste'}, 
                    {association: 'subcategory',
                    include: [{association: 'category'}]
                }],
                where: {
                    subcategoryId: product.subcategoryId
                }
            })
            .then((relatedProducts) => {
                res.render('productDetail', {
                    product,
                    /* sliderTitle: "Productos relacionados", */
                    sliderProducts: relatedProducts,
                    session: req.session
                })
            })
            
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
    
    search: (req,res) => {
        res.render('searchResult', {
            session: req.session
        })
    }
}

module.exports = controller;