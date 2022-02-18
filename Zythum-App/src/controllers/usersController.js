let bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const Users = db.User;

let controller = {
    login: function(req,res){
        res.render('./users/login', {
            session: req.session //paso la session en todas las vistas, por si esta logueado
        })
    },
    
    logeo:function(req,res){
        let errors= validationResult(req);
    
        if(errors.isEmpty()){
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user =>{
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    rol: user.rol,
                    avatar: user.avatar
                }

                if(req.body.remember) { //si marco el check de recordar
                    const TIME_IN_MILISECONDS = 60000; //defino un tiempo en este caso 1 minuto
                    res.cookie("userZythum", req.session.user, { //creo la cookie poniendo el nombre de la misma y la info que quiero guardar
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    })
                }
                res.locals.user = req.session.user; //guardo el usuario logeado en locals.
                res.redirect('/');
            })
            
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
            let { name, lastname, email, password} = req.body
        
            Users.create({
                name,
                last_name: lastname,
                email,
                pass : bcrypt.hashSync(password, 10),
                rol: 0,
                avatar: req.file ? req.file.filename : 'default-user-img.png'
            })
            .then(() => {
                res.redirect('/users/login');
            })

        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                session: req.session,
                old : req.body
            })
        }
        
    },
    profile: (req, res) => {
        Users.findByPk(req.session.user.id, {
            include: [{association: 'addresses'}]
        })
        .then((user) => {
            res.render('users/profile', {
                user, 
                session: req.session
            })
        })
    },
    editProfile:(req,res) => {
        Users.findByPk(req.session.user.id, {
            include: [{association: 'addresses'}]
        })
        .then((user) => {
            res.render('users/editProfile', {
                user, 
                session: req.session
            })
        })
    },
    //este esta incompleto
    updateProfile:(req,res) => {
        let {name, last_name, email, phone} = req.body
        Users.findByPk(req.session.user.id)
        .then((user)=>{
            console.log(user)
            user.update({
                name: name,
                last_name,
                email,
                phone,
            },{
                where: {
                    id : req.session.user.id
                }
            })

            res.redirect('/users/profile');
        })
        }
}
module.exports = controller