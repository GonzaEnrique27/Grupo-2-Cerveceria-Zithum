function cookieSession(req, res, next) {
    if(req.cookies.userZythum) { //si esta guardado la coockie
        req.session.user = req.cookies.userZythum; //inicia sesion
        res.locals.user = req.session.user; //tmb lo guardo en locals
    }
    next();
}

module.exports = cookieSession;