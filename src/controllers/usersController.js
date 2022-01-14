let { getUsers, writeJsonUser} = require('../data/dataBase')
let bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

let controller = {
    register: function(req,res){
        res.render('./users/register')
    },
    processRegister : (req,res) =>{

        let errors= validationResult(req);

        if(errors.isEmpty()){
            let numId = 1

            getUsers.forEach(user => {
                if(user.id <= numId){
                    numId++
                }
            });

            let { name, lastname, email, password, confirmPpassword} = req.body
        
            let newUser = {
                id: +numId,
                name,
                lastname,
                email,
                password : bcrypt.hashSync(password, 10),
                category: 'user',
                avatar: req.file ? req.file.filename : 'default-user-img.png'
            }

            getUsers.push(newUser);

            writeJsonUser(getUsers);

            res.send('¡REGISTRO EXITOSO!'); //borrar una vez creada la vista de profile user
            res.redirect(`/users/${numId}`);

        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                session: req.session,
                old : req.body
            })
        }
        
    },
    login: function(req,res){
        res.render('./users/login')
    },
    logeo:function(req,res){
        let errors= validationResult(req);

        if(errors.isEmpty()){

        
        

        let userLogeado = users.find(user => user.email === req.body.email);

            if(userLogeado){
                req.session.userLogeado = {
                    id: userLogeado.id,
                    name: userLogeado.name,
                    lastname:userLogeado.lastName,
                    email: userLogeado.email
                }
                 for (let i = 0; i< users.lenght; i++){                                    // BUSCA EN LOS USUARIOS UNO A UNO
                     if (users[i].email == req.body.email){                               // VERIFICA EL EMAIL
                         if (bcrypt.compareSync(req.body.password, users[i].password)){   //VERIFICA QUE LA CONTRASEÑA SEA CORRECTA
                             let usuarioALoguearse = users[i]                             // COMPRUEBA QUE AMBOS EXISTEN
                             break
                         }
                     }
                 if (usuarioALoguearse == undefined){                                      // EN CASO DE NO EXISTIR...
                     return res.render('login', {errors:[
                         {msg: 'Credenciales Invalidas'}
                     ]})
                 }
                 req.session.usuarioLogueado = usuarioALoguearse                           //GUARDA EN SESSION EL USUARIO LOGEADO
                 }   
            }else{
                res.redirect('/users/login', {errors: errors.errors})                      // REDIRECCIONA A LA PAGINA CON LOS ERRORES
            }   

        }
    }
}
module.exports = controller