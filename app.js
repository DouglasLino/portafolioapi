// manejar errores por partes del server
var createError = require('http-errors');
var express = require('express');
// utilizar el directorio de la maquina local 
// tipo acceder a una foto en la compu
var path = require('path');
// almacenar del lado server las cockies y no solo 
// en el cliente
var cookieParser = require('cookie-parser');
// moran = consol logs bonitos
var logger = require('morgan');
var mongoose = require('mongoose')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// ver los logs con morgan
app.use(logger('dev'));
// aceptar json 
app.use(express.json());
// aceptar cierto tipos de archivos
app.use(express.urlencoded({ extended: false }));
// las cocies
app.use(cookieParser());
// darle una ruta especifica
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// CONEXIO A LA BDD
mongoose.connect(process.env.MONGO_URI, {
  // objeto de config
  // crear index automatic
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}) // devuelve una promesa
.then(() => {
  console.log('Connected to Database');
}) // en dado caso hay error
.catch(err => {
  console.log(err);
})

var usersRouter = require('./routes/UserRoutes')

// http://localhost:300/users
app.use('/users', usersRouter)

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
