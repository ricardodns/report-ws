'use strict';


var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Report = mongoose.model('Reports'),
  User = mongoose.model('Users');

//Report
exports.list_all_reports = function(req, res) {
  Report.find({}, function(err, report) {
    if (err)
      res.send(err);
    res.json(report);
  });
};

exports.create_a_report = function(req, res) {
  var new_report = new Report(req.body);
  new_report.save(function(err, report) {
    if (err)
      res.send(err);
    res.json(report);
  });
};

exports.read_a_report = function(req, res) {
  Report.findById(req.params.reportId, function(err, report) {
    if (err)
      res.send(err);
    res.json(report);
  });
};

exports.update_a_report = function(req, report) {
  Report.findOneAndUpdate({_id: req.params._id}, req.body, { new: true }, function(err, report) {
    if (err)
      res.send(err);
    res.json(report);
  });
};

exports.delete_a_report = function(req, res) {
  Report.remove({
    _id: req.params.reportId
  }, function(err, report) {
    if (err)
      res.send(err);
    res.json({ message: 'Report successfully deleted' });
  });
};


//User
exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function(req, user) {
  User.findOneAndUpdate({_id: req.params._id}, req.body, { new: true }, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function(req, res) {
  Report.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Report successfully deleted' });
  });
};

exports.authenticate = function(req, res) {

  // find the user
  User.findById(req.params._id, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
};




