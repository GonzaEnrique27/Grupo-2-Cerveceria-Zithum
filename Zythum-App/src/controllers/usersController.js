let { getUsers, writeJsonUser} = require('../database/dataBase')
let bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

let controller = {
    login: function(req,res){
        res.render('./users/login', {
            session: req.session //paso la session en todas las vistas, por si esta logueado
        })
    },
    
    logeo:function(req,res){
        let errors= validationResult(req);
    
        if(errors.isEmpty()){
    
            let userLogeado = getUsers.find(user => user.email === req.body.email);
    
            req.session.user = {
                id: userLogeado.id,
                name: userLogeado.name,
                lastname:userLogeado.lastName,
                email: userLogeado.email,
                rol: userLogeado.rol
            }

            if(req.body.remember) { //si marco el check de recordar
                const TIME_IN_MILISECONDS = 60000; //defino un tiempo en este caso 1 minuto
                res.cookie('userZythum', req.session.user, { //creo la cookie poniendo el nombre de la misma y la info que quiero guardar
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                })
            }

            res.locals.user = req.session.user; //guardo el usuario logeado en locals.
            res.redirect('/');
            
        }else{
            res.render('./users/login', {
                errors: errors.mapped(),
                session: req.session
            });
        }
            
    },
    
    logout: (req,res)=>{
        req.session.destroy();
        if(req.cookies.userZythum){
            res.cookie('userZythum','', { maxAge: -1})
        }
        res.redirect('/')
    },  

    register: function(req,res){
        res.render('./users/register', {
            session: req.session
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
                rol: 'user',
                tel: "",
                address: "",
                pc: "",
                city: "",
                province: "",
                avatar: req.file ? req.file.filename : 'default-user-img.png'
            }

            getUsers.push(newUser);

            writeJsonUser(getUsers);

            res.redirect('/users/login');

        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                session: req.session,
                old : req.body
            })
        }
        
    },

    profile: (req,res)=>{
        let user = getUsers.find(user => user.id === req.session.user.id);

        res.send('Aca pondria mi vista de perfil, si tan solo tuviera una!!');
    }
}
module.exports = controller