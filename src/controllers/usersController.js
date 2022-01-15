let { getUsers, writeJsonUser} = require('../data/dataBase')
let bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

let controller = {
    login: function(req,res){
        res.render('./users/login', {
            sesion: req.session //paso la session en todas las vistas, por si esta logueado
        })
    },
    
    logeo:function(req,res){
        let errors= validationResult(req);
    
        if(errors.isEmpty()){
    
            let userLogeado = getUsers.find(user => user.email === req.body.email);
    
            req.session.userLogeado = {
                id: userLogeado.id,
                name: userLogeado.name,
                lastname:userLogeado.lastName,
                email: userLogeado.email
            }

            res.locals.user = req.session.userLogeado; //guardo el usuario logeado en locals.
            res.redirect('/');
            
        }else{
            res.render('./users/login', {
                errors: errors.mapped(),
                sesion: req.session
            });
        }
            
    },  

    register: function(req,res){
        res.render('./users/register', {
            sesion: req.session
        })
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

            let { name, lastname, email, password} = req.body
        
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

            /* res.send('¡REGISTRO EXITOSO!'); //borrar una vez creada la vista de profile user
            res.redirect(`/users/${numId}`); */
            res.redirect('/users/login');

        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                session: req.session,
                old : req.body
            })
        }
        
    },
}
module.exports = controller