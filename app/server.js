var port = process.env.PORT || 3333,
	express = require('express'),	  	
    app = express();


app.get('/', function(req, res) {
    console.log("hello");
    res.send('');
});


app.get('/hello', function(req, res){
  res.send('Hello World2');
});

//Initalizer
app.listen(port, function() {
    console.log('Listening on port ' + port);
});