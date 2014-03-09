var mongoose = require('mongoose')

var usersSchema = new mongoose.Schema({
        name: String,
        email: {type: String, index: true, unique: true, required: true},
        title: String,
        bio: String,
        google_token: String,
        created_at: {type: Date, default: Date.now}
});

usersSchema.index({google_id:1});

usersSchema.methods.domain  = function domain() {
    return this.email.split('@')[1];
}

usersSchema.methods.displayName  = function displayName() {
    return this.name || this.email;
}

var User = mongoose.model('User', usersSchema);

function createUserSync(name, email) {
    var user = new User({name: name, email: email});
    user.save();
    return user;
}

function findOrCreateUserByLinkedInProfile(token, tokenSecret, linkedinProfile, callback) {
    //var email = googleProfile.emails[0]['value'];
    User.findOne({linkedinID: linkedinProfile.id} , function(err, user) {
        if (err) {
            console.log("unable to retrieve user for linkedinID " + linkedinProfile.id);
        } else {
            if (user) {
                callback(null, user)
            } else {
                User.create({
                    linkedinID: linkedinProfile.id,
                    token: token,
                    tokenSecret: tokenSecret
                    //email: email,
                    //name: googleProfile.displayName
                }, callback);

            }
        }
    });
}

exports.findOrCreateUserByLinkedInProfile = findOrCreateUserByLinkedInProfile
exports.createUserSync = createUserSync
exports.User = User
