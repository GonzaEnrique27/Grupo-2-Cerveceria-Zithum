const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/users'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_user-img${path.extname(file.originalname)}`)
    }
})

let uploadFile = multer({ storage })

module.exports = uploadFile;