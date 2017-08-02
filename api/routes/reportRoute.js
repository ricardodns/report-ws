'use strict';
module.exports = function(app) {
  var reports = require('../controllers/reportController.js');


  // report Routes
  app.route('/reports')
    .get(reports.list_all_reports)
    .post(reports.create_a_report);


  app.route('/reports/:reportId').get(reports.read_a_report)
    .put(reports.update_a_report)
    .delete(reports.delete_a_report);
};
