var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Report = require('./api/models/reportModel'),
  User = require('./api/models/userModel'),
  jwt = require('jsonwebtoken'),
  config = require('./config'),
  bodyParser = require('body-parser');

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGODB_URI ||
  'mongodb://localhost/reportdb';

mongoose.Promise = global.Promise;
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', function(req, res) { res.json({data : 'hello'});})




var routes = require('./api/routes/reportRoute');
routes(app);




var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('Report RESTful API server started on: ' + port);
});
