const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
	facebook: {
		id: String,
		token: String,
		name: String
	}
});

module.exports = mongoose.model('user', userSchema);