let express = require('express');   //Requiero express
let app = express();                //Ejecuto express
const PORT = 3030;                  //Puerto 3030
let path = require('path')          //Usar Path
app.use(express.static("public"))   //El server usa todo lo de Public

//SISTEMA DE RUTAS

app.get('/' , (req , res)=>{
   res.sendFile(path.join(__dirname,"/views/index.html"))
})

app.get('/productDetail', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))
})

app.get('/productCart', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/productCart.html"))
})

app.get('/register', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/register.html"))
})

app.get('/login', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/login.html"))
})


// LEVANTAR SERVIDOR
app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}
http://localhost:${PORT} 
`))
