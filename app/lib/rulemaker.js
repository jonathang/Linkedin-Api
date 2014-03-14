var url = require('url'),
    qs = require('querystring'),
    util = require('util'),
    Lin = require('linkedin-node');
    RuleEngine = require('./business-rules/lib/business-rules/rule-engine');

function rules(req, res) {
    res.render('rules');
}

function rulesendpoint(req, res) {
    console.log(util.inspect(req.body.rules.all));
    //res.send("OK");
    re = new RuleEngine({
        conditions: req.body.rules,
        actions: [{name: "action-select", value: "giveDrink", fields: [{name: "drinkType", value: "martini"}]}]
    });

    var record = {
        firstname: "Peyton",
        age:       "32"
    }
    var conditionsAdapter = {
        firstnameField: record.firstname,
        ageField: record.age
    };
    var actionsAdapter = {
        giveDrink: function(data) {
            var thedata = util.inspect(record);
            console.log("data is ...." + thedata);
            res.send("some data: " + thedata + " ....");
        }
    }
    re.run(conditionsAdapter, actionsAdapter);
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

