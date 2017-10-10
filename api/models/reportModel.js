 'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReportSchema = new Schema({
        created_date: {
            type: Date,
            default: Date.now
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        description: {
            type: String
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        neighborhood: {
            type: String
        },
        number: {
            type: Number
        },
        ownerId: {
            type: String
        },
        province: {
            type: String
        },
        status: {
	        type: [{
	            type: String,
	            enum: ['pending', 'ongoing', 'completed']}
            ],
            default: ['pending']
        },
	    tipo: {
	      type: String
        }
});

module.exports = mongoose.model('Reports', ReportSchema);




