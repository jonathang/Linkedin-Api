var passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin').Strategy,
    url = require('url'),
    qs = require('querystring'),
    util = require('util'),

    users = require('./users');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: '***REMOVED***',        // Linkedin Application API Key
    consumerSecret: '***REMOVED***',   // Linkedin Application Secret Key
    callbackURL: (process.env.URL || 'http://localhost:3333/') + 'auth/linkedin/callback',
  },

  function(token, tokenSecret, profile, done) {
     process.nextTick(function () {
      var user = {}
      user.profile = profile;
      user.token = token;
      user.tokenSecret = tokenSecret
     /* // var googleToken = qs.parse(url.parse(identifier).query)['id'];
      users.findOrCreateUserByLinkedInProfile(googleToken, profile, function(err, user) {
        if (err) {
          console.error("Unable to fetch the user", err)
          return done(null, false, { message: "Unable to login using your Linkedin account"})
        }*/
        console.log("profile:" + util.inspect(profile));
        return done(null, user);
      });
   }
 ));


function auth(req, res) {
    var url = req.session.redirectUrl ? req.session.redirectUrl : '/';
    req.session.redirectUrl = null;
    res.redirect(url);
 }

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

function login(req, res) {
    res.render('login');
}

function ensureAuthenticated(req, res, next) {
  var email = "test.com",
      useFakeUser = false;
  if (useFakeUser && process.env.ENV_VARIABLE === "development") {
    users.User.findOne({email: email}, function(err, user) {
      if (user) {
        req.user = user;
      } else {
       req.user = users.createUserSync("test user 1", email)
      }
      return next();
    });
  } else if (req.isAuthenticated()) {
    return next();
   } else {
    req.session.redirectUrl = req.originalUrl;
    res.redirect('/login');
  }
}

exports.auth = auth;
exports.logout = logout;
exports.login = login;
exports.ensureAuthenticated = ensureAuthenticated;
