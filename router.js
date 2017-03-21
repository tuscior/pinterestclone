const pin = require('./routes/pin');
const home = require('./routes/home');
const profile = require('./routes/profile');
const passport =  require('passport');
const path = require('path');
const checkAuth = function(req,res, next){
	if(req.isAuthenticated()){
		next();
	} else {
		res.send('you need to login');
	}
}
module.exports = function(app){
app.get('/home', home.homeView);
app.get('/profile', checkAuth, profile.profileView);
app.post('/add', pin.addPin);
app.get('/logout', (req,res) => {
	req.logout();
	res.json({msg: 'You are logout', success: true});
});
app.delete('/delete/:id', pin.deletePin);
app.post('/vote/:id', pin.addVote);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/'}));
}
