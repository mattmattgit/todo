const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID();

console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('unable to connect');
	}
	console.log('connected to server');

	// db.collection('Todos').insertOne({
	// 	text: 'something',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('unable to input', err)
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2))
	// })

	// db.collection('Users').insertOne({
	// 	name: 'matt',
	// 	age: 28,
	// 	locations: 'Easterton'
	// }, (err, result) => {
	// 	if (err) {
	// 		console.log('Couldn\'t connect', err)
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2))
	// })

	db.close();
});