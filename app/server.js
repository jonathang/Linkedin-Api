
var port = process.env.PORT || 3333,
	express = require('express'),	  	
    app = express(),  
    mongoose;

require('./config/express')(app);
require('./config/routes')(app);

//Initalizer
app.listen(port, function() {
    console.log('Listening on port ' + port);
});

