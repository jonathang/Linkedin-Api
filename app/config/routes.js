var auth = require("../lib/auth"),
	passport = require("passport"),
	util = require("util"),
    rulemaker = require("../lib/rulemaker");

module.exports = function(app) {
	app.get('/', auth.ensureAuthenticated, rulemaker.getConnections)
	app.get('/login', auth.login);
	app.get('/auth/linkedin', passport.authenticate('linkedin'), auth.auth);
	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), auth.auth);  	  
    app.get('/rules', rulemaker.rules);
    app.post('/rules/rules_endpoint', rulemaker.rulesendpoint);
}
