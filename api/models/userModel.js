 'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
        email: {
            type: String
        },
        name: {
            type: String
        },
        cpf: {
            type: String
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        birth_date: {
            type: String
        },
        password: {
            type: String
        },
        admin: {
            type: Boolean,
            default: false
        }
});

module.exports = mongoose.model('Users', UserSchema);




