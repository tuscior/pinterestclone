const config = require('./config');
const User = require('../models/user');
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
	passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
    	User.findOne({'facebook.id': profile.id}, (err, user) => {
    		if(err) return done(err);
    		if(user) return done(null, user);
    		else {
    			const newUser = new User();
    				newUser.facebook.id = profile.id;
    				newUser.facebook.token = accessToken;
    				newUser.facebook.name = profile.displayName;		
    			
    			newUser.save((err) => {
    				if(err) throw err;
    				return done(null, newUser);
    			});
    		}
    	});
    });
  }
));
}