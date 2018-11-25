const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {
	ObjectID
} = require('mongodb');

const {
	mongoose
} = require('./db/mongoose');

const {
	Todo
} = require('./models/todos');

const {
	User
} = require('./models/users');

const {
	authenticate
} = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
	//console.log(req.body);

	var todo = new Todo({
		text: req.body.text,
		createdBy: req.user._id
	});

	todo.save().then((doc) => {
		console.log('Record added successfully.', JSON.stringify(doc, undefined, 4));
		res.send(doc);
	}, (err) => {
		console.log('Error occurred while adding a record.', err);
		res.status(400).send(err);
	});
});

app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		createdBy: req.user._id
	}).then((todos) => {
			res.send({
				todos
			});
		},
		(err) => {
			console.log("Error while getting a list", JSON.stringify(todos, undefined, 4));
			res.status(400).send(err);
		});
});

app.get('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if (ObjectID.isValid(id)) {
		Todo.findOne({
			_id: id,
			createdBy: req.user._id
		}).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {

	var id = req.params.id;

	if (ObjectID.isValid(id)) {
		Todo.findOneAndRemove({
			_id: id,
			createdBy: req.user._id
		}).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (ObjectID.isValid(id)) {

		if (_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}

		Todo.findOneAndUpdate({
			_id: id,
			createdBy: req.user._id
		}, {
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

app.post('/users', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then((user) => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
		console.log('User added successfully.', JSON.stringify(user, undefined, 4));
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	User.findByCredentials(body.email, body.password).then((user) => {
		res.send(user);
	}).catch((e) => {
		res.status(400).send();
	});
	res.send(body);
});

app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000.');
});