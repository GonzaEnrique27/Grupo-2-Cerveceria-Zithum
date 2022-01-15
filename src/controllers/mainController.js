let controller = {
    home: function(req,res){
        res.render('index'), {
            sesion: req.session
        }
    }
}

module.exports = controller