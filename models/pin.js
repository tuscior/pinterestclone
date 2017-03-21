const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = Schema({
	url: String,
	authorID: String,
	author: String,
	title: String,
	votes: String,
	voters: Array
});

const Pin = mongoose.model('pin', pinSchema);
module.exports = Pin;

module.exports.addPin = function(newPin, callback){
	newPin.save(callback); 
}
module.exports.findPinsForUser = (id, callback) => {
	Pin.find({authorID: id}, callback);
}
module.exports.findAll = (callback) => {
	Pin.find({}, callback);
}
module.exports.findPin = (id, callback) =>{
	Pin.findOne({_id: id}, callback);		
}
module.exports.deletePin = function(Pin, callback){
	Pin.remove(callback);
}
module.exports.addVote = (pin, id, callback) => {
let num = parseInt(pin.votes);
pin.votes = num+1;
pin.voters.push(id);
pin.save(callback);
}