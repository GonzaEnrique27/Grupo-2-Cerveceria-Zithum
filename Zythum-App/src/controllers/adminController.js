let { validationResult } = require('express-validator')
const fs = require('fs');
const db = require('../database/models');

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Brands = db.Brand;
const Sizes = db.Size;
const Tastes = db.Taste;

let controller = {
    index: (req, res)=> {
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
            res.render('./admin/adminIndex', {
                products,
                session: req.session
            })
        })
    },
    //Muestra la vista de edicion
    create: (req, res) => {
        let allCategories = Categories.findAll();
        let allSubcategories = Subcategories.findAll();
        let allBrands = Brands.findAll();
        let allSizes = Sizes.findAll();
        let allTastes = Tastes.findAll();


        Promise.all([allCategories, allSubcategories, allBrands, allSizes, allTastes])
        .then(([categories, subcategories, brands, sizes, tastes]) => {
            res.render('./admin/crearProducto', {
                brands,
                categories,
                subcategories,
                sizes,
                tastes,
                session: req.session
            });
        })
    },
    //Crea el producto
    store: (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let { brand, category, subcategory, size, alcohol, density, taste, amargor, price, discount, stock, description } = req.body
    
            Products.create({
                brandId: brand, 
                subcategoryId: subcategory, 
                sizeId: size, 
                tasteId: taste, 
                alcohol, 
                density, 
                amargor, 
                price, 
                discount, 
                stock, 
                description,
                image: req.file ? req.file.filename : 'default-img.png'
            })
            .then(() => {res.redirect('/admin')})
            .catch(error => console.log(error))          
        } else {
            let allCategories = Categories.findAll();
            let allSubcategories = Subcategories.findAll();
            let allBrands = Brands.findAll();
            let allSizes = Sizes.findAll();
            let allTastes = Tastes.findAll();


            Promise.all([allCategories, allSubcategories, allBrands, allSizes, allTastes])
            .then(([categories, subcategories, brands, sizes, tastes]) => {
                res.render('./admin/crearProducto', {
                    brands,
                    categories,
                    subcategories,
                    sizes,
                    tastes,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                });
            })
            .catch(error => console.log(error))
        }
        

    },
    //Muestra la vista de edicion
    edit: (req, res) => {
        const productId = +req.params.id;
        const productPromise = Products.findByPk(productId, {
            include: [{association: 'subcategory',
                include: [{association: 'category'}]
            }]
        });
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        const brandsPromise = Brands.findAll();
        const sizesPromise = Sizes.findAll();
        const tastesPromise = Tastes.findAll();
        
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise, brandsPromise, sizesPromise, tastesPromise])
        .then(([product, categories, subcategories, brands, sizes, tastes])=>{
            res.render('./admin/editarProducto', {
                product,
                categories, 
                subcategories,
                brands,
                sizes,
                tastes,
                session: req.session
            })
        })
        .catch(error => console.log(error)) 
    },

    update: (req, res)=> {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const { brand, subcategory, size, alcohol, density, taste, amargor, price, discount, stock, description } = req.body

            Products.findByPk(req.params.id)
            .then((product)=> {
                if(req.file) {
                    if(product.image != 'default-img.png'){
                        if(fs.existsSync(`./public/img/products/${product.image}`)) {
                            fs.unlinkSync(`./public/img/products/${product.image}`)
                        } else {
                            console.log('No encontre el archivo');
                        }
                    }
                    product.update({
                        brandId: brand, 
                        subcategoryId: subcategory, 
                        sizeId: size, 
                        tasteId: taste, 
                        alcohol, 
                        density, 
                        amargor, 
                        price, 
                        discount, 
                        stock, 
                        description,
                        image: req.file.filename
                    },{
                        where:{
                            id: req.params.id
                        }
                    })
                    
                } else {
                    product.update({
                        brandId: brand, 
                        subcategoryId: subcategory, 
                        sizeId: size, 
                        tasteId: taste, 
                        alcohol, 
                        density, 
                        amargor, 
                        price, 
                        discount, 
                        stock, 
                        description,
                        image: product.image
                    },{
                        where:{
                            id: req.params.id
                        }
                    })
                }
                
            })
            .catch(error => console.log(error))
                .then(() => {
                    res.redirect('/admin')
                })

        } else {
            const productId = +req.params.id;
            const productPromise = Products.findByPk(productId, {
                include: [{association: 'subcategory',
                    include: [{association: 'category'}]
                }]
            });
            const categoriesPromise = Categories.findAll();
            const subcategoriesPromise = Subcategories.findAll();
            const brandsPromise = Brands.findAll();
            const sizesPromise = Sizes.findAll();
            const tastesPromise = Tastes.findAll();
            
            Promise.all([productPromise, categoriesPromise, subcategoriesPromise, brandsPromise, sizesPromise, tastesPromise])
            .then(([product, categories, subcategories, brands, sizes, tastes])=>{
                res.render('./admin/editarProducto', {
                    product,
                    categories, 
                    subcategories,
                    brands,
                    sizes,
                    tastes,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                })
            })
            .catch(error => console.log(error)) 
        }
    },

    destroy: (req, res)=> {
        Products.findByPk(req.params.id)
        .then((product)=> {
            if(product.image != 'default-img.png'){
                if(fs.existsSync(`./public/img/products/${product.image}`)) {
                    fs.unlinkSync(`./public/img/products/${product.image}`)
                } else {
                    console.log('No encontre el archivo');
                }
            }
            Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(res.redirect('/admin'))
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }
}

module.exports = controller;