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

var id = "5be410bb951d1a0d5437aa67";

Todo.findOneAndRemove({
	_id: id
}).then((todo) => {
	console.log(todo);
}, (err) => {
	console.log(err);
});

Todo.findByIdAndRemove(id).then((todo) => {
	if (todo) {
		console.log('Todo removed by Id', todo);
	} else {
		console.log('Id is not found.');
	}
}, (err) => {
	console.log(err);
}).catch((err) => {
	console.log(err);
});
//
//
//
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log(todos);
// }, (err) => {
// 	console.log(err);
// });