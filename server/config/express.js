/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var busboy = require('connect-busboy');
var mongoose = require('mongoose');
var fs = require('fs');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(busboy({ immediate: true }));
  app.use('/upload', function(request, response) {
      var fileName = "";
      var publicFolder = 'client/assets/images/uploads';

      request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data){

          fs.writeFile(path.join(publicFolder, filename), data);
        });
        file.on('end', function(){
          console.log('File' + filename + 'is ended');
          fileName = filename;
        });
      });
     request.busboy.on('finish', function(){
        console.log('Busboy is finished');
         var imagePath = path.join(config.root,publicFolder, fileName);

       response.status(201).json(JSON.parse('{"path":"' + imagePath + '"}')).end();
    })
  });
  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
  }));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
