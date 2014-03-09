var auth = require("../lib/auth");

module.exports = function(app) {
	app.get('/', function(req, res) {
    	console.log("hello");
    	res.send('');
	});
	
	app.get('/hello', function(req, res){
  		res.send('Hello World3');
	});

	app.get('/login', auth.login);
}