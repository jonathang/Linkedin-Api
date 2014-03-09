
var port = process.env.PORT || 3333,
	express = require('express'),	  	
        app = express(),
        auth = require("./lib/auth"),
        flash = require('connect-flash');

app.get('/', function(req, res) {
    console.log("hello");
    res.send('');
});


app.get('/hello', function(req, res){
  res.send('Hello World3');
});

app.get('/login', auth.login);

//Initalizer
app.listen(port, function() {
    console.log('Listening on port ' + port);
});

