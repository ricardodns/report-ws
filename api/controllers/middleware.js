'use strict';

var jwt = require('jsonwebtoken');

exports.auth = function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {

    // verifies secret and checks exp
    jwt.verify(token, "@Report_machine", function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        return true;
      }
    });

  } else {

    // if there is no token
    // return an error
    res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    return false;

  }
}
