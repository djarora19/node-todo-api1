const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {
	ObjectID
} = require('mongodb');

var {
	mongoose
} = require('./db/mongoose');

const {
	Todo
} = require('./models/todos');

const {
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

app.get('/todos/:id', (req, res) => {

	var id = req.params.id;

	if (ObjectID.isValid(id)) {
		Todo.findById(id).then((todo) => {
				if (todo) {
					res.send({
						todo
					});
				} else {
					res.status(404).send();
				}
			},
			(err) => {
				console.log("Error while getting a todo", JSON.stringify(todo, undefined, 4));
				res.status(400).send();
			}).catch((e) => {
			res.status(400).send();
		});
	} else {
		return res.status(404).send();
	}
});

app.delete('/todos/:id', (req, res) => {

	var id = req.params.id;

	if (ObjectID.isValid(id)) {
		Todo.findByIdAndRemove(id).then((todo) => {
				if (todo) {
					res.send({
						todo
					});
				} else {
					res.status(404).send();
				}
			},
			(err) => {
				console.log("Error while removing a todo", JSON.stringify(todo, undefined, 4));
				res.status(400).send();
			}).catch((e) => {
			res.status(400).send();
		});
	} else {
		return res.status(404).send();
	}
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (ObjectID.isValid(id)) {

		if (_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}

		Todo.findByIdAndUpdate(id, {
			$set: body
		}, {
			new: true
		}).then((todo) => {

			if (todo) {
				res.send({
					todo
				});
			} else {
				res.status(404).send();
			}

		}, (err) => {
			console.log("Error while updating a todo", JSON.stringify(todo, undefined, 4));
			res.status(400).send();
		}).catch((e) => {
			res.status(400).send();
		});
	} else {
		return res.status(404).send();
	}
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