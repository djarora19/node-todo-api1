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

	return _.pick(userObj, ['_id', 'email']);
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

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;

	try {
		return User.findOne({
			email
		}).then((user) => {
			if (user) {
				return new Promise((resolve, reject) => {
					bcryptjs.compare(password, user.password, (err, res) => {
						if (res) {
							resolve(user);
						} else {
							reject();
						}
					});
				});
			} else {
				return Promise.reject();
			}
		});
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

UserSchema.methods.removeToken = function(token) {
	var user = this;

	return user.update({
		$pull: {
			tokens: {
				token
			}
		}
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