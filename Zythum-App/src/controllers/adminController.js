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


        Promise.all([allCategories, allSubcategories, allBrands, allSizes, allTastes]) //esto de aca no lo entiendo
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
        let arrayImages = [];
        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }

        let { brand, category, size, alcohol, density, taste, amargor, price, discount, stock, description } = req.body

        Products.create({
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
        })
        .then((product)=> {
            if(arrayImages.length > 0){
                let images = arrayImages.map((image) => {
                    return {
                        image: image,
                        productId: product.id
                    }
                });
                ProductImages.bulkCreate(images)
                .then(() => res.redirect('/admin/products'))
                .catch(error => console.log(error))
            }else {
                ProductImages.create({
                    image: 'default-image.png',
                    productId: product.id
                })
                .then(() => {res.redirect('/admin/products')})
                .catch(error => console.log(error))
            }
        })
        .catch(error => console.log(error))
    },
    //Muestra la vista de edicion
    edit: (req, res) => {
        let productId = Number(req.params.id);
        const productPromise = Products.findByPk(productId);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories])=>{
            res.render('./admin/editarProducto', {
                product,
                categories, 
                subcategories,
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