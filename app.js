
// Module dependencies
var express = require('express');
var app = express();
var morgan = require('morgan');
var flash = require('connect-flash');
var multiparty = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var config = require('./config.json');
var routes = require('./routes');
var db = require('./lib/db');
// View setup
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.locals = require('./helpers/index');

// Loading middleware
   app.use(morgan('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(methodOverride(function(req, res){
     if (req.body && typeof req.body === 'object' && '_method' in req.
   body) {
       // look in url - encoded POST bodies and delete it
       var method = req.body._method;
       delete req.body._method;
       return method;
} }));
   app.use(cookieParser());
   app.use(cookieSession({
     secret: config.sessionSecret,
     cookie: {
       maxAge: config.sessionMaxAge
     }
   }));
   app.use(flash());
   if (app.get('env') === 'development') {
     app.use(errorHandler());
}
   // static middleware after the routes
   app.use(express.static(__dirname + '/public'));
   // Establishing database connection and binding application to
   specified port
   db.connect();
   app.listen(config.port);
   console.log('listening on port %s', config.port);