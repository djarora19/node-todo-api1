var mongoose = require('mongoose');

var User = mongoose.model('Users', {
	email: {
		type: String,
		required: true,
		minlength: 10,
		trim: true
	}
});

module.exports = {
	User
};