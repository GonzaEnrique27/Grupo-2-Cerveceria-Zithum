var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
var app = express();
const { body, validationResult } = require('express-validator')


//Enrutadores
var mainRouter = require('./routes/mainRouter');
var usersRouter = require('./routes/usersRouter');
var productsRouter = require('./routes/productsRouter');
let adminRouter = require('./routes/adminRouter');

//Validaciones

app.post('/register', [
  body('name', 'Ingrese un Nombre')
  .exists()
  .isLength({min:4}),
  body ('lastname','Ingrese un Apellido' )
  .exists()
  .isLength({min:4}),
  body('email', 'Ingrese un Email valido')
  .exists()
  .isEmail(),
  body('password','Se requiere una Contraseña')
  .exists()
  .isLength({min:8}),
  body('confirm-password','Se requiere confirmacion de la Contraseña')
  .exists()
  .isLength({min:8}),

], (req,res)=> {
  const errors = validationResult(req)
  if (!errors.esEmpty()) {
    console.log(req.body)
    const validaciones = errors.array()
    res.render ('index', {validaciones:validaciones, valores: valores})
  } else{
    res.send('¡REGISTRO EXITOSO')
  }
  })



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const session = require('express-session');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE


//Codigo secreto de session
app.use(session({
  secret:'Soy un codigo ultra hiper secreto',
  resave: false,
  saveUninitialized:true,
  cookie: {secure:true}
}))


app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
