var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();
// const {authenticate} = require('cirrus-auth-module')
var publicRouter = require('./routes/public');
var { swaggerRouter } = require('./routes/swagger');
var privateRouter = require('./routes/private');
const { middleWare } = require('./passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

swaggerRouter(app);
app.use('/', publicRouter);
middleWare(app);
// app.post('/login', (req, res) => {
//   console.log('HERE IN LOGIN ROUTE')
// })
app.use('/', privateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
