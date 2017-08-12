'use strict';


var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  auth = require('./middleware'),
  Report = mongoose.model('Reports'),
  User = mongoose.model('Users');

//Report
exports.list_all_reports = function(req, res) {
    auth.auth(req, res);
    Report.find({}, function(err, report) {
      try{
        if (err)
         res.send(err);
        res.json(report);
      }catch(err){

      }
    });
};

exports.create_a_report = function(req, res) {
  auth.auth(req, res);
  var new_report = new Report(req.body);
  new_report.save(function(err, report) {
    if (err)
      res.send(err);
    res.json(report);
  });
};

exports.read_a_report = function(req, res) {
  auth.auth(req, res);
  try{
    Report.findById(req.params.reportId, function(err, report) {
      if (err)
        res.send(err);
      res.json(report);
    });
  }catch(err){}
};

exports.update_a_report = function(req, res) {
  auth.auth(req, res);
  try{
    Report.findOneAndUpdate({_id: req.params._id}, req.body, { new: true }, function(err, report) {
      if (err)
        res.send(err);
      res.json(report);
    });
  }catch(err){}
};

exports.delete_a_report = function(req, res) {
  auth.auth(req, res);
  try{
    Report.remove({
      _id: req.params.reportId
    }, function(err, report) {
      if (err)
        res.send(err);
      res.json({ message: 'Report successfully deleted' });
    });
  }catch(err){}
};


//User
exports.create_a_user = function(req, res) {
  auth.auth(req, res);
  try{
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }catch(err){}
};

exports.list_all_users = function(req, res) {
  auth.auth(req, res);
  try{
    User.find({}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }catch(err){}
};

exports.read_a_user = function(req, res) {
  auth.auth(req, res);
  try{
    User.findById(req.params.userId, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }catch(err){}
};

exports.update_a_user = function(req, res) {
  auth.auth(req, res);
  try{
    User.findOneAndUpdate({_id: req.params._id}, req.body, { new: true }, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }catch(err){}
};

exports.delete_a_user = function(req, res) {
  auth.auth(req, res);
  try{
    User.remove({
      _id: req.params.userId
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'Report successfully deleted' });
    });
  }catch(err){}
};

exports.authenticate = function(req, res) {

  // find the user
  User.findById(req.body._id, function(err, user) {

    if (err) 
      res.send(err);

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, "@Report_machine", {
          expiresIn: "10h"
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




