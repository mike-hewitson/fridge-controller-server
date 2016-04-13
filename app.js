var expressWinston = require('express-winston');
var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var readingRoute = require('./routes/readingRouter');

var mongoose = require('mongoose');

var url = 'mongodb://192.168.1.101:27017/charcuterie';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected correctly to server");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Place the express-winston logger before the router.
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            expressFormat: true,
            colorize: true,
            tags: ['a test']
        }),
        new Papertrail({
            host: 'logs4.papertrailapp.com',
            port: 32583, // your port here
            program: 'rest-server',
            colorize: true

        })
    ]
}));

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/readings', readingRoute);

// Place the express-winston errorLogger after the router.
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            expressFormat: true,
            colorize: true
        }),
        new Papertrail({
            host: 'logs4.papertrailapp.com',
            port: 32583, // your port here
            program: 'rest-server',
            colorize: true

        })
    ]
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
