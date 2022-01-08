let { getUsers, writeJsonUser} = require('../data/dataBase')
let bcrypt = require('bcryptjs');

let controller = {
    register: function(req,res){
        res.render('./users/register')
    },
    processRegister : (req,res) =>{
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

        res.send('Registrado wachin'); //borrar una vez creada la vista de profile user
        res.redirect(`/users/${numId}`);
    },
    login: function(req,res){
        res.render('./users/login')
    }
}

module.exports = controller