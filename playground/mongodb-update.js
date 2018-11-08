//const MongoClient = require('mongodb').MongoClient;
const {
	MongoClient,
	ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) {
		return console.log('Unable to connect to Mongodb Serveer.');
	}

	console.log('Connected to Mongodb Server.');
	const db = client.db('TodoApp');

	//findOneandUpdate
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5be3d18cd4b463b89199be05')
	}, {
		$set: {
			name: 'Kishan Kathiriya',
			age: 25
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	// //findOneandUpdate
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5be3cfc1d4b463b89199bd93')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });




});