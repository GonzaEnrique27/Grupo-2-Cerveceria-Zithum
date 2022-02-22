/* function isUser(req, res, next){
    if(req.session.user){
        console.log(req.session.user)
        next()
    }else{
        res.redirect('/users/login')
    }
}

module.exports = isUser; */

module.exports = {
    isGuest: (req, res, next)=> {
        if(req.session.user === undefined){
            next()
        }else{
            res.redirect('/')
        }
    },
    isUser: (req, res, next)=> {
        if(req.session.user && req.session.user.rol === 0){
            next()
        }else{
            res.redirect('/users/login')
        }
    },
    isAdmin: (req, res, next)=> {
        if(req.session.user && req.session.user.rol === 1){
            next()
        }else{
            res.redirect('/users/login')
        }
    }
}