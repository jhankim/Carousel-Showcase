//Dependencies
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

//Configure Express Server
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
//app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

//Add Error Handling
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//Configure the routes for the server
app.use('/',express.static(path.join(__dirname, 'Client_Files')));
app.use('/Example',express.static(path.join(__dirname, 'Example')));

// Define Error Handling
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
};

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
};

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//Start the Server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});