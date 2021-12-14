const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products2.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let controller = {
    // Detail - Detail from one product
    detail: function(req,res){
        let idProduct = +req.params.id;
		let product = products.find(product => product.id === idProduct);

        res.render('productDetail', {
            product
        })
    },
    create:function(req,res){
        let numId = 1

        products.forEach(product => {
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
        products.push(nuevoProducto)
        let productsJSON= JSON.stringify(products)
        fs.writeFileSync(productsFilePath,productsJSON,'utf-8')
        res.redirect("/")
    },
    productCart: function(req,res){
        res.render('productCart')
    },
    quitarProducto: function(req,res){
        res.render('quitarProducto')
    },
    formulario: function(req,res){
        res.render('formulario')
    },
    edit: function(req, res) {
        let idProduct = +req.params.id;

        products.forEach((product, index) => {
            if(product.id === idProduct) {

                product.brand = req.body.brand,
                product.category = req.body.category,
                product.price = +req.body.price,
                product.discount = req.body.discount,
                product.tamanio = +req.body.tamanio,
                product.alcohol = +req.body.alcohol,
                product.sabor = req.body.sabor,
                product.amargura = +req.body.amargura,
                product.description = req.body.description,
                product.stock = +req.body.stock,
                product.img = req.body.img
                //aca va una validacion de la imagen
            }

            let productsJSON= JSON.stringify(products)
            fs.writeFileSync(productsFilePath,productsJSON,'utf-8')

        })
        res.redirect('/products')
    },

    destroy: function(req, res) {
        let idProduct = +req.params.id;

        products.forEach((product, index)=>{

            if( product.id === idProduct) {
                products.slice(index,1)
            }
        })
        res.redirect('/products')
    }

}

module.exports = controller