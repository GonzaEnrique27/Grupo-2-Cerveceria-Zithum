const db = require('../database/models');
const { Op } = require('sequelize');

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Brands = db.Brand;
const Sizes = db.Size;
const Tastes = db.Taste;

let controller = {
    home: (req,res)=> {
        Products.findAll({
            include: [
                {association: 'brand'}, 
                {association: 'size'}, 
                {association: 'taste'}, 
                {association: 'subcategory',
                include: [{association: 'category'}]
            }],
            limit: 8
        })
        .then(products => {
                res.render('index', {
                    products,
                    /* sliderTitle: "Productos relacionados", */
                    session: req.session
                })
            })
        /* res.render('index', {
            session: req.session
        }) */
    }
}

module.exports = controller