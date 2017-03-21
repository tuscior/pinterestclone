const Pin = require('../models/pin');
const user = require('../models/user');

module.exports.profileView = function(req,res){
	const id = req.user._id;
	Pin.findPinsForUser(id, (err, pin) => {
		if(err) return err;
		if(pin){
			res.json([pin, req.user]);
		}
	});
}