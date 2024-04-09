var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var pessoasRouter = require('./routes/pessoas');
var modalidadesRouter = require("./routes/modalidades")

var mongoose = require("mongoose")
const {modalidades} = require("./controllers/modalidades");

var mongoBD = "mongodb://127.0.0.1/pessoas"
mongoose.connect(mongoBD)

var db = mongoose.connection
db.on('error',console.error.bind(console,"erro na conecção na coneção"))

db.once("open",()=>{
  console.log("Estou conectado ao DB PESSOAS")
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pessoas', pessoasRouter);
app.use("/modalidades",modalidadesRouter);

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
