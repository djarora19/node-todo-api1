var express = require('express');
var bodyParser = require('body-parser');

var {
	mongoose
} = require('./db/mongoose');

var {
	Todo
} = require('./models/todos');

var {
	User
} = require('./models/users');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	console.log(req.body);

	var todo = new Todo(req.body);

	todo.save().then((doc) => {

		console.log('Record added successfully.', JSON.stringify(doc, undefined, 4));
		res.send(doc);
	}, (err) => {
		console.log('Error occurred while adding a record.', err);
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
			res.send({
				todos
			});
		},
		(err) => {
			console.log("Error while getting a list", JSON.stringify(todos, undefined, 4));
			res.status(400).send(err);
		});
});

// app.post('/users', (req, res) => {
// 	console.log(req.body);
//
// 	var todo = new User(req.body);
//
// 	todo.save().then((doc) => {
//
// 		console.log('User added successfully.', JSON.stringify(doc, undefined, 4));
// 		res.send(doc);
// 	}, (err) => {
// 		console.log('Error occurred while adding a User.', err);
// 		res.status(400).send(err);
// 	});
//});

app.listen(3000, () => {
	console.log('Server is running on port 3000.');
});