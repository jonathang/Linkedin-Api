var auth = require("../lib/auth"),
	passport = require("passport"),
	util = require("util"),
    rulemaker = require("../lib/rulemaker");

module.exports = function(app) {
	app.get('/', auth.ensureAuthenticated, function(req, res) {
    	res.render("home", {user: util.inspect(req.user)});
	});

	app.get('/login', auth.login);
	app.get('/auth/linkedin', passport.authenticate('linkedin'), auth.auth);
	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), auth.auth);  	  
        app.get('/rules', rulemaker.rules);
}
