const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID();

console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('unable to connect');
	}
	console.log('connected to server');

	//delete many
	// db.collection('Todos').deleteMany({text: 'eat lunch'}).then( (result) => {
	// 	console.log(result);
	// })

	//delete one
	// db.collection('Todos').deleteOne({text: 'eat lunch'}).then((res) => {
	// 	console.log(res);
	// })

	// //find one and delete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
	// 	console.log(res)
	// })

	db.collection('Users').deleteMany({name: 'nick'}).then((res) => {
		console.log(res);
	})

	// var id = new ObjectID("5a197aaeb1302d831165876e");

	// db.collection('Users').findOneAndDelete({_id: id}).then((res) => {
	// 	console.log(res);
	// })

	// db.close();
});