var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var connect = require('connect');
var logger = require('morgan');

//parsing
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.schema = {};
app.config = config;

// schema Path
require('./schemaPath')(app, mongoose);
app.functions = require('./DataModel/functions');

//api routes file path
require('./routes.js')(app);

app.set('port', process.env.PORT || 8080);
// mongoose connection code (Mongodb library for node js)
var connection = mongoose.connect(config.MONGO_URI);
      mongoose.connection.on('error', function(err) {
      console.log('Error: Error in connecting with mongodb');
  });  

var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
  });
