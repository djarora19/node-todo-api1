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

	var collection = db.collection('Users');

	collection.find({
		name: 'Madhu Kishan'
	}).count().then((count) => {
		console.log('Users');
		console.log(`Todos Count : ${count}`);

	}, (err) => {
		console.log('Unable to fetch records.');
	});


	// var collection = db.collection('Todos');
	//
	// collection.find().count().then((count) => {
	// 	console.log('Todos');
	// 	console.log(`Todos Count : ${count}`);
	//
	// }, (err) => {
	// 	console.log('Unable to fetch records.');
	// });

	// collection.find({
	// 	//_id: '(5bd3fde3d80d440a5e23bcd7)'
	// 	_id: new ObjectID('5bd3fde3d80d440a5e23bcd7')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 4));
	//
	// }, (err) => {
	// 	console.log('Unable to fetch records.');
	// });

	// collection.find().toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 4));
	//
	// }, (err) => {
	// 	console.log('Unable to fetch records.');
	// });


	client.close();
});