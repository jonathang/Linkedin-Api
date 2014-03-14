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
    var options = {'count' : 1000, 'fields': ":(id,first-name,last-name,headline,picture-url,positions)"};
    var api = Lin.api('v1', 'peopleAPI', 'connections', options);
    var credentials = {token: {token: req.user.token, secret: req.user.tokenSecret}}; 		
    Lin.makeRequest(credentials, {api:api}, function(err, data) {
        filterConnections(err, data, req, res);
    });
}


function filterConnections(err, data, req, res) {
    re = new RuleEngine({
        conditions: req.body.rules,
        actions: [{name: "action-select", value: "giveDrink", fields: [{name: "drinkType", value: "martini"}]}]
    });

    records = JSON.parse(data.response.body).values;
    console.log(records);
  
    var output = ""
    for (var i=0; i<records.length; i++) {
        var record = {
            firstname: records[i].firstName,
            age:       "",
            lastname:  records[i].lastName,
            picture:   records[i].pictureUrl
        }
        var conditionsAdapter = {
            firstnameField: record.firstname,
            ageField: record.age
        };
        var actionsAdapter = {
            giveDrink: function(data) {
                var thedata = util.inspect(record);
                output = output + record.firstname + " " + record.lastname + "<img src='" + record.picture + "' />" + "<br />\n";
            }
        }
        re.run(conditionsAdapter, actionsAdapter);
    }
    console.log(output);
    res.send(output);
}

function getConnections(req, res) {
}

exports.rules = rules;
exports.getConnections = getConnections;
exports.rulesendpoint = rulesendpoint;

