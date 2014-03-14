var url = require('url'),
    qs = require('querystring'),
    util = require('util'),

    users = require('./users');


function rules(req, res) {
    res.render('rules');
}

exports.rules = rules;
