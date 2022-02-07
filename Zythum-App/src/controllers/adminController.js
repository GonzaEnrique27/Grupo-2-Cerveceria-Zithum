let { getProducts, getUsers, writeJson} = require('../database/dataBase')
const fs = require('fs');
//Borrar lo de arriba
//falta validaciones
const { Op } = require('sequelize');
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
        let { brand, category, size, alcohol, density, taste, amargor, price, discount, stock, description } = req.body

        Products.update({
            brand, 
            subcategoryID: category, 
            size, 
            alcohol, 
            density, 
            taste, 
            amargor, 
            price, 
            discount, 
            stock, 
            description
        },{
            where:{
                id: req.params.id
            }
        })



        /* let idProduct = +req.params.id;
        let {
            brand,
            category,
            size,
            alcohol,
            density,
            taste,
            amargor,
            price,
            discount,
            stock,
            description,
        } = req.body

        getProducts.forEach((product) => {
            if(product.id === idProduct) {

                product.brand = brand,
                product.category = category,
                product.size = size,
                product.alcohol = alcohol,
                product.density = density,
                product.taste = taste,
                product.amargor = amargor,
                product.stock = stock,
                product.price = price,
                product.discount = discount,
                product.description = description

                if(req.file) {
					if(fs.existsSync(`./public/img/products/${product.image}`)) {
						fs.unlinkSync(`./public/img/products/${product.image}`)
					} else {
						console.log('No encontre el archivo')
					}
					product.image = req.file.filename
				} else {
					product.image = product.image
				} 
            }

            writeJson(getProducts);

        })
        res.redirect(`/products/detail/${idProduct}`) */
    },

    destroy: function(req, res) {
        ProductImages.findAll({
            where: {
                productId: req.params.id
            }
        })
        .then((images) => {
            images.forEach((image) => {
                if(fs.existsSync(`./public/img/products/${image.image}`)) {
					fs.unlinkSync(`./public/img/products/${image.image}`)
				} else {
					console.log('No encontre el archivo');
				}
            })
            ProductImages.destroy({
                where: {
                    productId: req.params.id
                }
            })
            .then((result) => {
                Products.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(res.redirect('/admin'))
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))

        /* let idProduct = +req.params.id;

        getProducts.forEach((product, index)=>{

            if( product.id === idProduct) {
                if(fs.existsSync(`./public/img/products/${product.image}`)) {
					fs.unlinkSync(`./public/img/products/${product.image}`)
				} else {
					console.log('No encontre el archivo')
				}
                getProducts.splice(index,1)
            }
        })

        writeJson(getProducts)
        res.redirect('/admin') */
    }
}

module.exports = controller;