var auth = require("../lib/auth"),
	passport = require("passport"),
	util = require("util"),
    rulemaker = require("../lib/rulemaker"),
	Lin = require('linkedin-node');
	
	var linConfig = {
		"env":"production", 
		"oauth": {
		  	"apiKey": ***REMOVED***,
		  	"apiSecret": ***REMOVED***,  	
		  	"requestTokenCallback": "http://localhost:3000/accessToken",
		  	"apiServer": 'http://api.linkedin.com/v1/',
		    "apiAuthority": "http://api.linkedin.com/v1/",
		    'directRequestServer': 'https://www.linkedin.com',
		    'directRequestUrl': 'https://www.linkedin.com/uas/oauth/direct',
			'tokenServer': 'https://api.linkedin.com'
		}
	} 

	Lin.init(linConfig);

module.exports = function(app) {
	app.get('/', auth.ensureAuthenticated, function(req, res) {
		var options = {'count' : 1000, 'fields': ":(id,first-name,last-name,headline,picture-url,positions)"}
		var api = Lin.api('v1', 'peopleAPI', 'connections', options);
		//var api = Lin.api('v1','newsAPI','topNews',{});
		var credentials = {token: {token: req.user.token, secret: req.user.tokenSecret}}; 		
		Lin.makeRequest(credentials, {api:api}, function(err, data) {			
	    	//res.render("home", {user: util.inspect(req.user), data: util.inspect(data)});
	    	res.json(data)
	    });
	});

	app.get('/login', auth.login);
	app.get('/auth/linkedin', passport.authenticate('linkedin'), auth.auth);
	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), auth.auth);  	  
        app.get('/rules', rulemaker.rules);
        app.post('/rules/rules_endpoint', rulemaker.rulesendpoint);
}
