'use strict';


var mongoose = require('mongoose'),
  Report = mongoose.model('Reports');

exports.list_all_reports = function(req, res) {
    // res.json({hello: "world"});
    console.log("LOL1");
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
  Report.findOneAndUpdate({_id: req.params.taskId}, req.body, { new: true }, function(err, report) {
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
