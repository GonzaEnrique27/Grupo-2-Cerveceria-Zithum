let controller = {
    home: function(req,res){
        res.render('index'), {
            session: req.session
        }
    }
}

module.exports = controller