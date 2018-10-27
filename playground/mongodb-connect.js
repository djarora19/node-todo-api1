const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	if (err) {
		return console.log('Unable to connect to Mongodb Serveer.');
	}

	console.log('Connected to Mongodb Server.');
	const db = client.db('TodoApp');

	var collection = db.collection('Todos');

	// collection.insertOne({
	// 	todo: 'Insert one record',
	// 	success: true
	//
	// }, (error, result) => {
	// 	if (error) {
	// 		return console.log("Unable to insert.", error);
	// 	}
	//
	// 	console.log(JSON.stringify(result.ops, undefined, 4));
	// });

	collection = db.collection('Users');

	collection.insertOne({
		name: 'Arora Divyangkumar Jayantilal',
		age: 24

	}, (error, result) => {
		if (error) {
			return console.log("Unable to insert.", error);
		}

		console.log(JSON.stringify(result.ops, undefined, 4));
		console.log(result.ops[0]._id.getTimestamp());
	});

	client.close();
});