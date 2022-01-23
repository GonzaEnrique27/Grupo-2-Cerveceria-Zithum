let controller = {
    home: (req,res)=> {
        res.render('index', {
            session: req.session
        })
    }
}

module.exports = controller