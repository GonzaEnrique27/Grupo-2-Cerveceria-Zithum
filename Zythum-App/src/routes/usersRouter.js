var express = require('express');
var router = express.Router();
let { login, logeo, logout, register, processRegister, profile, editProfile, updateProfile} = require('../controllers/usersController');
let { isGuest, isUser } = require('../middlewares/authUser');
let uploadAvatar = require('../middlewares/uploadUserFile');
let registerValidator = require('../validations/registerValidator');
let loginValidator = require('../validations/loginValidator');

//GET - Login
router.get('/login', isGuest, login);
//POST - Login
router.post('/login', loginValidator, logeo);
//GET - Logout
router.get('/logout', logout);

//GET- Register
router.get('/register', isGuest, register);
// POST - Reister
router.post('/register',uploadAvatar.single('image'), registerValidator , processRegister);

//GET - User Profile
router.get('/profile', isUser, profile);

/* router.get('/profile/edit/:id', isUser, editProfile); */

router.put('/profile/edit/:id', isUser, updateProfile);

module.exports = router;