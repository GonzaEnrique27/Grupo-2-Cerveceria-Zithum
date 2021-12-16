const fs = require('fs');

let { getProducts, getUsers, writeJson } = require('../data/dataBase')

let controller = {
    // Detail - Detail from one product
    detail: function(req,res){
        let idProduct = +req.params.id;
		let product = getProducts.find(product => product.id === idProduct);

        res.render('productDetail', {
            product
        })
    },
    create:function(req,res){
        let numId = 1

        getProducts.forEach(product => {
            if(product.id <= numId){
                numId++
            }
        });
        let nuevoProducto = {
            id: +numId,
            nombre: req.body.nombre,
            detalle: req.body.detalle,
            categoria: req.body.categoria,
            subcategoria: req.body.subcategoria
        }
        getProducts.push(nuevoProducto)

        writeJson(getProducts);

        res.redirect("/")
    },
    productCart: function(req,res){
        res.render('productCart')
    },
    
    formulario: function(req,res){
        res.render('formulario')
    },
    
    edit: function(req,res) {

        let idProduct = +req.params.id;
        let product = getProducts.find(product => product.id === idProduct);

        res.render('./admin/crearProducto', {
            product
        });
    },

    update: function(req, res) {
        let idProduct = +req.params.id;
        let {
            brand,
            category,
            size,
            alcohol,
            density,
            taste,
            amargura,
            price,
            discount,
            stock,
            description
        } = req.body

        getProducts.forEach((product) => {
            if(product.id === idProduct) {

                product.brand = brand,
                product.category = category,
                product.size = size,
                product.alcohol = alcohol,
                product.density = density,
                product.taste = taste,
                product.amargura = amargura,
                product.stock = stock,
                product.price = price,
                product.discount = discount,
                product.description = description

                if(req.file) {
					if(fs.existsSync('./public/img/products/', product.image)) {
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
        res.redirect(`/products/detail/${idProduct}`)
    },

    destroy: function(req, res) {
        let idProduct = +req.params.id;

        getProducts.forEach((product, index)=>{

            if( product.id === idProduct) {
                if(fs.existsSync('./public/img/products/', product.image)) {
					fs.unlinkSync(`./public/img/products/${product.image}`)
				} else {
					console.log('No encontre el archivo')
				}
                getProducts.splice(index,1)
            }
        })

        writeJson(getProducts)
        res.redirect('/')
    }

}

module.exports = controller;