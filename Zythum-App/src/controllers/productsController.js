const db = require('../database/models');
const { Op } = require('sequelize');

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Brands = db.Brand;
const Sizes = db.Size;
const Tastes = db.Taste;


let controller = {
    // Detail - Detail from one product, falta implementar los productos relacionados
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
                res.render('./products/productDetail', {
                    product,
                    /* sliderTitle: "Productos relacionados", */
                    sliderProducts: relatedProducts,
                    session: req.session
                })
            })
            
        })
    },

    allProducts: (req,res)=> {
        Products.findAll({
            include: [
                {association: 'brand'}, 
                {association: 'size'}, 
                {association: 'taste'}, 
                {association: 'subcategory',
                include: [{association: 'category'}]
            }]
        })
        .then(products => {
                res.render('./products/allProducts', {
                    products,
                    /* sliderTitle: "Productos relacionados", */
                    session: req.session
                })
            })
    },

    category: (req, res) => {
        Categories.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                association: 'subcategories',
                include: [{
                    association: 'products',
                    include: [
                        {association: 'brand'}, 
                        {association: 'size'}, 
                        {association: 'taste'}]
                }]
            }]
        })
        .then((category) => {
            let subcategories = category.subcategories;
            let products = [];
            subcategories.forEach((subcategory) => {
                subcategory.products.forEach((product) => {
                    products.push(product);
                });
            });
            res.render('./products/category', {
                products,
                category,
                subcategories,
                session: req.session
            });
        })
        .catch(error => console.log(error))
    },
    
    search: (req, res) => {
        Brands.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.keywords
                }
            },
            include: [{
                association: 'products',
                include: [
                    {association: 'brand'}, 
                    {association: 'size'}, 
                    {association: 'taste'},
                    {association: 'subcategory',
                        include: [{association: 'category'}]
                    }]
            }]
        })
        .then((brands) => {
            let resultSearch = [];

            brands.forEach((brand)=> {
                brand.products.forEach((product)=> {
                    resultSearch.push(product)
                })
            })

            Subcategories.findAll({
                where: {
                    name: {
                        [Op.substring]: req.query.keywords
                    }
                },
                include: [
                    {association: 'products',
                        include: [
                            {association: 'brand'}, 
                            {association: 'size'}, 
                            {association: 'taste'},
                            {association: 'subcategory',
                                include: 
                                    [{association: 'category'}]
                            }
                        ]
                    }
                ]
            })
            .then((subcategories)=>{
                subcategories.forEach((subcategory)=>{
                    subcategory.products.forEach((product)=>{
                        resultSearch.push(product);
                    })
                })

                let hash = {};
                let result = [];
                result = resultSearch.filter(function(current) {
                    let exists = !hash[current.id];
                    hash[current.id] = true;
                    return exists;
                });
                console.log(result.length)
                res.render('./products/searchResult', {
                    result,
                    search: req.query.keywords,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    },

    productCart: function(req,res){
        res.render('productCart', {
            session: req.session
        })
    },
    
    /* subcategory: (req, res) => {
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
    }, */
}

module.exports = controller;