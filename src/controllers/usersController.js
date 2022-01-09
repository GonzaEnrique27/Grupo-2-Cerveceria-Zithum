const fs = require('fs');
const path = require('path')

let userPath = path.join(__dirname,'../data/users.json');
let users = JSON.parse(fs.readFileSync(userPath,'utf-8'));

let controller = {
    register: function(req,res){
        res.render('register')
    },login: function(req,res){
        res.render('login')
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

            res.send('Tas logeado')
        
    }
}

module.exports = controller