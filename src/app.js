var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Enrutadores
var indexRouter = require('./routes/indexRouter');
var loginRouter = require('./routes/loginRouter');
var productCartRouter = require('./routes/productCartRouter');
var productDetailRouter = require('./routes/productDetailRouter');
var registerRouter = require('./routes/registerRouter');
var formularioRouter = require('./routes/formularioRouter');
var quitarProductosRouter = require('./routes/quitarProductosRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/productCart', productCartRouter);
app.use('/productDetail', productDetailRouter);
app.use('/register', registerRouter);
app.use('/formulario', formularioRouter);
app.use('/quitarProducto', quitarProductosRouter);



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
