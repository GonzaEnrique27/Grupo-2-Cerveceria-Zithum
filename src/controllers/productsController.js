const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let controller = {
    product: function(req,res){
        res.render('productDetail')
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
    }

}

module.exports = controller