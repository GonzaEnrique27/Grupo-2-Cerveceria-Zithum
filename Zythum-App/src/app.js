var createError = require('http-errors');
var logger = require('morgan');
var express = require('express');
var app = express();
var path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('./middlewares/cookieSession');

/* MIDDLEWARES */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
  secret: "Zythum-secret",
  resave: false,
  saveUninitialized: true
}))
app.use(cookieParser());
app.use(cookieSession); //implemento la cookie se sesion a nivel aplicacion.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Enrutadores
let mainRouter = require('./routes/mainRouter');
let usersRouter = require('./routes/usersRouter');
let productsRouter = require('./routes/productsRouter');
let adminRouter = require('./routes/adminRouter');


/* ROUTES */
app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);



// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */
/* 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;
