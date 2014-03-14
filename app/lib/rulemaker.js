var url = require('url'),
    qs = require('querystring'),
    util = require('util'),  
    Lin = require('linkedin-node');

function rules(req, res) {
    res.render('rules');
}

function rulesendpoint(req, res) {
    console.log(util.inspect(req.body.rules.all));
    res.send("OK");
}

function getConnections(req, res) {
	var options = {'count' : 1000, 'fields': ":(id,first-name,last-name,headline,picture-url,positions)"};
	var api = Lin.api('v1', 'peopleAPI', 'connections', options);
	var credentials = {token: {token: req.user.token, secret: req.user.tokenSecret}}; 		
	Lin.makeRequest(credentials, {api:api}, function(err, data) {			
		res.json(data)	 
	});
}

exports.rules = rules;
exports.getConnections = getConnections;
exports.rulesendpoint = rulesendpoint;

