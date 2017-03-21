const Pin = require('../models/pin');

module.exports.homeView = function(req,res){

	Pin.findAll((err, pins) => {
		if(err) return err;
		else {
			res.json([pins, req.user]);
		}
	});
}