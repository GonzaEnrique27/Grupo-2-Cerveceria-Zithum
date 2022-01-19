function isUser(req, res, next){
    if(req.session.user === 'USER_ADMIN'){
        next()
    }else{
        res.redirect('/users/login')
    }
}

module.exports = isUser;