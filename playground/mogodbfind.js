const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID();

console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('unable to connect');
	}
	console.log('connected to server');

	// db.collection('Todos').find({completed: false}).toArray().then((docs) => {
	// 	console.log('Todos: ');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Didn\'t work', err);
	// });

	// db.collection('Todos').count().then((count) => {
	// 	console.log(`Total: ${count}`)
	// }, (err) => {
	// 	console.log('failed', err)
	// })

	db.collection('Users').find({name: 'matt'}).toArray().then((name) => {
		console.log(name)
	}, (err) => {
		console.log(err)
	})
	// db.close();
});