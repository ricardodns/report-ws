'use strict';
module.exports = function(app) {
  var reports = require('../controllers/reportController.js');
  var auth = require('../controllers/middleware');

  // report Routes
  app.route('/reports')
    .get(auth.auth, reports.list_all_reports)
    .post(auth.auth, reports.create_a_report);


  app.route('/reports/:reportId').get(auth.auth, reports.read_a_report)
    .put(auth.auth, reports.update_a_report)
    .delete(auth.auth, reports.delete_a_report);


  app.route('/users')
  	.get(auth.auth, reports.list_all_users)
  	.post(auth.auth, reports.create_a_user);

  app.route('/users/:userId').get(auth.auth, reports.read_a_user)
  	.put(auth.auth, reports.update_a_user)
  	.delete(auth.auth, reports.delete_a_user);

  app.route('/authenticate')
    .post(reports.authenticate);

};
