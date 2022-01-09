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
        for(let i = 0; i < users.length; i++){
            if(req.body.email == users[i].email){
                if(req.body.password == users[i].password){
                    let userLogeado = users[i]
                    break;
                }
                
            }else{
                res.redirect('/users/login')
            }
            req.session.userLogeado = userLogeado
            res.send('Tas logeado')
        }
    }
}

module.exports = controller