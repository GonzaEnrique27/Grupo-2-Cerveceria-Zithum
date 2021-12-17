let { getProducts, getUsers, writeJson} = require('../data/dataBase')
const fs = require('fs');

let controller = {
    //Muestra el dashboard
    index: function(req, res) {
        res.render('./admin/adminIndex', {
            products : getProducts
        })
    },
    //Muestra la vista de edicion
    create: function(req, res) {
        res.render('./admin/crearProducto');
    },
    //Crea el producto
    store: function(req,res){
        let numId = 1

        getProducts.forEach(product => {
            if(product.id <= numId){
                numId++
            }
        });

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

        
        let nuevoProducto = {
            id: +numId,
            brand: brand,
            category: category,
            size: size,
            alcohol: alcohol,
            density: density,
            taste: taste,
            amargor: amargor,
            price: price,
            discount: discount,
            stock: stock,
            description: description,
			image: req.file ? req.file.filename : 'default-img.png'
        }

        getProducts.push(nuevoProducto)

        writeJson(getProducts);

        res.redirect(`/products/detail/${numId}`);
    },
    //Muestra la vista de edicion
    edit: function(req,res) {

        let idProduct = +req.params.id;
        let product = getProducts.find(product => product.id === idProduct);

        res.render('./admin/editarProducto', {
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
        res.redirect('/admin')
    }
}

module.exports = controller;