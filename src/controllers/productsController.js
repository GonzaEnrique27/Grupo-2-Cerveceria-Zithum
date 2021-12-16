const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
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
    
    edit: function(req,res) {

        let idProduct = +req.params.id;
        let product = products.find(product => product.id === idProduct);

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
            description,
            image
        } = req.body

        products.forEach((product) => {
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
                //product.img = req.body.img
                //aca va una validacion de la imagen
            }

            let productsJSON= JSON.stringify(products)
            fs.writeFileSync(productsFilePath,productsJSON,'utf-8')

        })
        res.redirect(`/products/detail/${idProduct}`)
    },

    destroy: function(req, res) {
        let idProduct = +req.params.id;

        products.forEach((product, index)=>{

            if( product.id === idProduct) {
                products.splice(index,1)
            }
        })

        let productsJSON= JSON.stringify(products)
        fs.writeFileSync(productsFilePath,productsJSON,'utf-8')
        res.redirect('/')
    }

}

module.exports = controller