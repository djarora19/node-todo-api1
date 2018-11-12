const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 10,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email !'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	var user = this;
	var userObj = user.toObject();

	return _.pick(userObj, ['email', '_id']);
}

UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'userAuth');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.methods.generateAuthToken = function() {
	var user = this;

	var access = 'auth';
	var token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, 'userAuth').toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => {
		return token;
	});
};


UserSchema.pre('save', function(next) {
	var user = this;

	if (user.isModified('password')) {
		bcryptjs.genSalt(10, (err, salt) => {
			bcryptjs.hash(user.password, salt, (e, hash) => {
				if (hash) {
					user.password = hash;
					next();
				}
			});
		});
	} else {
		next();
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = {
	User
};