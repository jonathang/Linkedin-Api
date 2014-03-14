var flash = require('connect-flash'), 
  	  passport = require('passport'),
      express = require('express'),
      Lin = require('linkedin-node');

module.exports = function(app) {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(flash());

  app.use(express.methodOverride());
  app.use(express.session({
    secret: (process.env.SESSION || 'You know the answer...'),
    cookie: { maxAge: 31*24*60*60*1000},
    //store: new mongoStore({
      //mongoose_connection: mongoose.connection
    //})
  }));

  app.use('/test', express.static(__dirname + '/../lib/business-rules/examples'));
  app.use('/test', express.directory(__dirname + '/../lib/business-rules/examples'));
  app.use('/lib', express.static(__dirname + '/../lib/business-rules/lib'));
  app.use('/lib', express.directory(__dirname + '/../lib/business-rules/lib'));
  app.use('/static', express.static(__dirname + '/../static'));
  app.use('/static', express.directory(__dirname + '/../static'));
  app.use('/blah', function(req, res) {
    res.send('hello world: ' + __dirname);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // View settings
  app.engine('ejs', require('ejs-locals'));
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/../views');

  
  var linConfig = {
    "env":"production", 
    "oauth": {
        "apiKey": "***REMOVED***",
        "apiSecret": "***REMOVED***",    
        "requestTokenCallback": "http://localhost:3000/accessToken",
        "apiServer": 'http://api.linkedin.com/v1/',
        "apiAuthority": "http://api.linkedin.com/v1/",
        'directRequestServer': 'https://www.linkedin.com',
        'directRequestUrl': 'https://www.linkedin.com/uas/oauth/direct',
      'tokenServer': 'https://api.linkedin.com'
    }
  } 

  Lin.init(linConfig);
  
}
