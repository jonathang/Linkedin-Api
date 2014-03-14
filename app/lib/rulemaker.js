var url = require('url'),
    qs = require('querystring'),
    util = require('util'),
    users = require('./users');


function rules(req, res) {
    res.render('rules');
}

function rulesendpoint(req, res) {
    console.log(util.inspect(req.body.rules.all));
    res.send("OK");
}

exports.rules = rules;
exports.rulesendpoint = rulesendpoint;

