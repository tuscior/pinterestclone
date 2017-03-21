const Pin = require('../models/pin');

module.exports.addPin = function(req,res){
	const newPin = new Pin ({
		url: req.body.url,
		authorID: req.body.authorID,
		title: req.body.title,
		author: req.body.author,
		votes: 0,
		voters: []
	});
	Pin.addPin(newPin, (err, pin) => {
		if(err) return err;
		if(pin){
			res.json({msg: "Pin added", success: true});
		}
	});
}
module.exports.deletePin = function(req,res){
	const id = req.params.id;
	Pin.findPin(id, (err,pin) => {
		if(err) return err;
		if(pin){
			Pin.deletePin(pin, (err, pin) => {
				if(err) return err;
				if(pin) {
					res.json({msg: "Pin deleted", success:true});
					
				}
			});
		}
	});
}
module.exports.addVote = (req,res) =>{
	const id = req.params.id;
	const userID = req.body.id;

Pin.findPin(id, (err,pin) => {
	if(err) return err;
	if(pin){
		Pin.addVote(pin, userID, (err, added) => {
			if(err) return err;
			if(added){
				res.json({msg: "Vote added", success:true});
			}
		});
	}
});
}
