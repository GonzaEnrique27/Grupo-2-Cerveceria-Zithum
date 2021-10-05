let express = require('express');   //Requiero express
let app = express();                //Ejecuto express
const PORT = 3030;                  //Puerto 3030
let path = require('path')          //Usar Path
app.use(express.static("public"))   //El server usa todo lo de Public

//SISTEMA DE RUTAS

app.get('/' , (req , res)=>{
   res.sendFile(path.join(__dirname,"/views/index.html"))
})

app.get('/babbage', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/babbage.html"))
})

app.get('/berners-lee', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/berners-lee.html"))
})

app.get('/clarke', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/clarke.html"))
})

app.get('/hamilton', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/hamilton.html"))
})

app.get('/hopper', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/hopper.html"))
})

app.get('/lovelace', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/lovelace.html"))
})

app.get('/turing', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/turing.html"))
})





// LEVANTAR SERVIDOR
app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}
http://localhost:${PORT} 
`))
