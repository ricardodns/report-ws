


'use strict';


var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  auth = require('./middleware'),
  Report = mongoose.model('Reports'),
  User = mongoose.model('Users');

//Report

/**
 * @api {get} /reports Read data of all reports
 * @apiVersion 0.1.0
 * @apiName GetReports
 * @apiGroup Report
 * @apiPermission none
 *
 * @apiDescription Returns a list with all reports.
 *
 * 
 *
 * @apiExample Example usage:
 * curl -i http://localhost/reports
 *
 * @apiSuccess {Object[]} reports               List of all reports.
 * @apiSuccess {String}   reports._id           The report id.
 * @apiSuccess {String}   reports.address       Report address.
 * @apiSuccess {String}   reports.city          Report city.
 * @apiSuccess {String}   reports.description   Report description.
 * @apiSuccess {String}   reports.latitude      Report latitude.
 * @apiSuccess {String}   reports.longitude     Report longitude.
 * @apiSuccess {String}   reports.neighborhood  Report neighborhood.
 * @apiSuccess {Number}   reports.number        Address number.
 * @apiSuccess {String}   reports.ownerId       Owner user's id.
 * @apiSuccess {String}   reports.province      Report province.
 * @apiSuccess {String}   reports.tipo          Report type.
 * @apiSuccess {String}   reports.status        Report status.
 * @apiSuccess {String}   reports.created_date  Report created date.
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.list_all_reports = function(req, res, next) {
    Report.find({}, function(err, report) {
      try{
        if (err)
         res.send(err);
        res.status(200).json(report);
      }catch(err){

      }
    });
};

/**
 * @api {post} /reports Create a new Report
 * @apiVersion 0.1.0
 * @apiName PostReport
 * @apiGroup Report
 * @apiPermission none
 *
 * @apiDescription Create a new Report.
 *
 *
 *
 * @apiParam {String}   address       Report address.
 * @apiParam {String}   city          Report city.
 * @apiParam {String}   description   Report description.
 * @apiParam {String}   latitude      Report latitude.
 * @apiParam {String}   longitude     Report longitude.
 * @apiParam {String}   neighborhood  Report neighborhood.
 * @apiParam {Number}   number        Address number.
 * @apiParam {String}   ownerId       Owner user's id.
 * @apiParam {String}   province      Report province.
 * @apiParam {String}   tipo          Report type.
 *
 *
 *
 * @apiSuccess {String}   _id           The report id.
 * @apiSuccess {String}   address       Report address.
 * @apiSuccess {String}   city          Report city.
 * @apiSuccess {String}   description   Report description.
 * @apiSuccess {String}   latitude      Report latitude.
 * @apiSuccess {String}   longitude     Report longitude.
 * @apiSuccess {String}   neighborhood  Report neighborhood.
 * @apiSuccess {Number}   number        Address number.
 * @apiSuccess {String}   ownerId       Owner user's id.
 * @apiSuccess {String}   province      Report province.
 * @apiSuccess {String}   tipo          Report type.
 * @apiSuccess {String}   status        Report status.
 * @apiSuccess {String}   created_date  Report created date.
 *
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.create_a_report = function(req, res, next) {
  
  var new_report = new Report(req.body);
  new_report.save(function(err, report) {
    if (err)
      res.send(err);
    res.status(200).json(report);
  });
};

/**
 * @api {get} /reports Read data of a report
 * @apiVersion 0.1.0
 * @apiName GetReport
 * @apiGroup Report
 * @apiPermission admin
 *
 * @apiDescription Returns a single report.
 *
 * 
 *
 * @apiExample Example usage:
 * curl -i http://localhost/reports/5827dhd8s332sf
 *
 * @apiSuccess {String}   _id           The report id.
 * @apiSuccess {String}   address       Report address.
 * @apiSuccess {String}   city          Report city.
 * @apiSuccess {String}   description   Report description.
 * @apiSuccess {String}   latitude      Report latitude.
 * @apiSuccess {String}   longitude     Report longitude.
 * @apiSuccess {String}   neighborhood  Report neighborhood.
 * @apiSuccess {Number}   number        Address number.
 * @apiSuccess {String}   ownerId       Owner user's id.
 * @apiSuccess {String}   province      Report province.
 * @apiSuccess {String}   tipo          Report type.
 * @apiSuccess {String}   status        Report status.
 * @apiSuccess {String}   created_date  Report created date.
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */


exports.read_a_report = function(req, res, next) {
  
  try{
    Report.findById(req.params.reportId, function(err, report) {
      if (err)
        res.send(err);
      res.status(200).json(report);
    });
  }catch(err){}
};

/**
 * @api {put} /reports/:id Update a report
 * @apiVersion 0.1.0
 * @apiName PutReport
 * @apiGroup Report
 * @apiPermission none
 *
 * @apiParam {String}   address       Report address.
 * @apiParam {String}   city          Report city.
 * @apiParam {String}   description   Report description.
 * @apiParam {String}   latitude      Report latitude.
 * @apiParam {String}   longitude     Report longitude.
 * @apiParam {String}   neighborhood  Report neighborhood.
 * @apiParam {Number}   number        Address number.
 * @apiParam {String}   ownerId       Owner user's id.
 * @apiParam {String}   province      Report province.
 * @apiParam {String}   tipo          Report type.
 *
 *
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.update_a_report = function(req, res, next) {
  
  try{
    Report.findOneAndUpdate({_id: req.params._id}, req.body, { new: true }, function(err, report) {
      if (err)
        res.send(err);
      res.status(200).json(report);
    });
  }catch(err){}
};

/**
 * @api {delete} /reports/:id Delete a report
 * @apiVersion 0.1.0
 * @apiName DeleteReport
 * @apiGroup Report
 * @apiPermission none
 *
 *
 *
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.delete_a_report = function(req, res, next) {
  
  try{
    Report.remove({
      _id: req.params.reportId
    }, function(err, report) {
      if (err)
        res.send(err);
      res.status(200).json({ message: 'Report successfully deleted' });
    });
  }catch(err){}
};


//User

/**
 * @api {post} /users Create a new User
 * @apiVersion 0.1.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Create a new User.
 *
 *
 *
 * @apiParam {String}                   email                       User e-mail address.
 * @apiParam {String}                   name                        User's name.
 * @apiParam {String}                   cpf                         User's cpf.
 * @apiParam {String}                   birth_date                  User's birth date.
 * @apiParam {String}                   password                    User's password.
 * @apiParam {String="true", "false"}   admin=false                 Tell if user is an administrator or not.
 * @apiParam {String}                   created_date=Date.now       Owner user's id.
 *
 *
 *
 * @apiSuccess {String}   _id            The user id.
 * @apiSuccess {String}   email          User e-mail address.
 * @apiSuccess {String}   name           User's name.
 * @apiSuccess {String}   cpf            User's cpf.
 * @apiSuccess {String}   birth_date     User's birth date.
 * @apiSuccess {String}   password       User's password.
 * @apiSuccess {String}   admin          Address number.
 * @apiSuccess {String}   created_date   Owner user's id.
 *
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.create_a_user = function(req, res, next) {
  
  try{
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.status(200).json(user);
    });
  }catch(err){}
};

/**
 * @api {get} /users Read data of all users
 * @apiVersion 0.1.0
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Returns a list with all users.
 *
 * 
 *
 * @apiExample Example usage:
 * curl -i http://localhost/users
 *
 * @apiSuccess {Object[]} user                A list of users.
 * @apiSuccess {String}   user._id            The user id.
 * @apiSuccess {String}   user.email          User e-mail address.
 * @apiSuccess {String}   user.name           User's name.
 * @apiSuccess {String}   user.cpf            User's cpf.
 * @apiSuccess {String}   user.birth_date     User's birth date.
 * @apiSuccess {String}   user.password       User's password.
 * @apiSuccess {String}   user.admin          Address number.
 * @apiSuccess {String}   user.created_date   Owner user's id.
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.list_all_users = function(req, res, next) {
  
  try{
    User.find({}, function(err, user) {
      if (err)
        res.send(err);
      res.status(200).json(user);
    });
  }catch(err){}
};

/**
 * @api {get} /users Read data of a user
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Returns a single user.
 *
 * 
 *
 * @apiExample Example usage:
 * curl -i http://localhost/users/5827dhd8s332sf
 *
 * @apiSuccess {String}   _id            The user id.
 * @apiSuccess {String}   email          User e-mail address.
 * @apiSuccess {String}   name           User's name.
 * @apiSuccess {String}   cpf            User's cpf.
 * @apiSuccess {String}   birth_date     User's birth date.
 * @apiSuccess {String}   password       User's password.
 * @apiSuccess {String}   admin          Address number.
 * @apiSuccess {String}   created_date   Owner user's id.
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.read_a_user = function(req, res, next) {
  
  try{
    User.findById(req.params.userId, function(err, user) {
      if (err)
        res.send(err);
      res.status(200).json(user);
    });
  }catch(err){}
};

/**
 * @api {put} /users Update a user's data.
 * @apiVersion 0.1.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Update a user's data.
 *
 *
 *
 * @apiParam {String}                   email                       User e-mail address.
 * @apiParam {String}                   name                        User's name.
 * @apiParam {String}                   cpf                         User's cpf.
 * @apiParam {String}                   birth_date                  User's birth date.
 * @apiParam {String}                   password                    User's password.
 * @apiParam {String="true", "false"}   admin=false                 Tell if user is an administrator or not.
 * @apiParam {String}                   created_date=Date.now       Owner user's id.
 *
 *
 *
 * @apiSuccess {String}   _id            The user id.
 * @apiSuccess {String}   email          User e-mail address.
 * @apiSuccess {String}   name           User's name.
 * @apiSuccess {String}   cpf            User's cpf.
 * @apiSuccess {String}   birth_date     User's birth date.
 * @apiSuccess {String}   password       User's password.
 * @apiSuccess {String}   admin          Address number.
 * @apiSuccess {String}   created_date   Owner user's id.
 *
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */


exports.update_a_user = function(req, res, next) {
  
  try{
    User.findOneAndUpdate({_id: req.params._id}, req.body, { new: true }, function(err, user) {
      if (err)
        res.send(err);
      res.status(200).json(user);
    });
  }catch(err){}
};

/**
 * @api {delete} /users delete a user
 * @apiVersion 0.1.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Deletes a single user.
 *
 * 
 *
 * @apiExample Example usage:
 * curl -i http://localhost/users/5827dhd8s332sf
 *
 * @apiSuccess {String}   success        "true"
 * @apiSuccess {String}   message        "Succesfully deleted"
 *
 * @apiError InvalidToken      Failed to authenticate token.
 * @apiError NoTokenProvided   No token provided.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "No token provided."
        }
 */

exports.delete_a_user = function(req, res, next) {
  
  try{
    User.remove({
      _id: req.params.userId
    }, function(err, user) {
      if (err)
        res.send(err);
      res.status(200).json({ message: 'Report successfully deleted' });
    });
  }catch(err){}
};

/**
 * @api {post} /authenticate Get a access token for 10 hours.
 * @apiVersion 0.1.0
 * @apiName PostAuth
 * @apiGroup Authenticate
 * @apiPermission none
 *
 * @apiDescription Get a access token for 10 hours. It must be used on request header as "x-access-token" in order to use any route.
 *
 * @apiParam {String}   _id            The user's id.
 * @apiParam {String}   password       User password.
 *
 *
 * @apiSuccess {String}   success     "true"
 * @apiSuccess {String}   token       Access token
 * @apiSuccess {String}   message     "Enjoy your token!"
 *
 * @apiError UserNotFound      User was not found.
 * @apiError WrongPassword     Wrong password.
 *
 * @apiErrorExample Response (example):
 *      {
          "success": false,
          "message": "Authentication failed. User not found."
        }
 */

exports.authenticate = function(req, res, next) {

  // find the user
  User.findById(req.body._id, function(err, user) {

    if (err){
      // res.send(err);
      // next();
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, "@Report_machine", {
          expiresIn: "10h"
        });

        // return the information including token as JSON
        res.status(200).json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
};




