
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  oscar = require('oscar');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.post('/login', function(req, res) {
  console.log("Received req of " + req + " login with " + req.username + "and password of ");
  console.log(req.body);
  console.log(req.body.user);
  //res.send('updating' + req.username);
  res.send(req.content);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
