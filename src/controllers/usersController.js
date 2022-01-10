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
                session: req.session 
            })
        }
        

        
    },
    login: function(req,res){
        res.render('./users/login')
    },
    logeo:function(req,res){

        let userLogeado = users.find(user => user.email === req.body.email);

            if(userLogeado){
                req.session.userLogeado = {
                    id: userLogeado.id,
                    name: userLogeado.name,
                    lastname:userLogeado.lastName,
                    email: userLogeado.email
                }
            }else{
                res.redirect('/users/login')
            }

        }
}
  
module.exports = controller