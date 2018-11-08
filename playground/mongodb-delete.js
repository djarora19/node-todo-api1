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

	var collection = db.collection('Todos');

	//deleteMany
	// collection.deleteMany({
	// 	text: 'Eat lunch'
	// }).then((result) => {
	// 	console.log(result);
	// });

	//deleteOne
	// collection.deleteOne({
	// 	text: 'Eat lunch'
	// }).then((result) => {
	// 	console.log(result);
	// });

	//findOneandDelete
	collection.findOneAndDelete({
		_id: new ObjectID('5be3ca5cd4b463b89199bcd9')
	}).then((result) => {
		console.log(result);
	});




});