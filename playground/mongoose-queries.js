const {
	ObjectID
} = require('mongodb');

const {
	mongoose
} = require('./../server/db/mongoose');

const {
	Todo
} = require('./../server/models/todos');

const {
	User
} = require('./../server/models/users');

var id = "5be41f1c33fa941614350e6412";

if (!ObjectID.isValid(id)) {
	console.log('Id is not valid.');
}

Todo.find({
	_id: id
}).then((todos) => {
	console.log(todos);
}, (err) => {
	console.log(err);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log(todo);
}, (err) => {
	console.log(err);
});

Todo.findById(id).then((todo) => {
	if (todo) {
		console.log('Todo by Id', todo);
	} else {
		console.log('Id is not found.');
	}
}, (err) => {
	console.log(err);
}).catch((err) => {
	console.log(err);
});

id = "5be415a44dc53713a02a92d4";

User.findById(id).then((user) => {
	if (user) {
		console.log(JSON.stringify(user, undefined, 4));
	} else {
		console.log('User is not found.');
	}
}, (err) => {
	console.log(err);
}).catch((err) => {
	console.log(err);
});