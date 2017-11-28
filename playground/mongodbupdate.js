const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID();

console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('unable to connect');
	}
	console.log('connected to server');

	//find one and update
	// db.collection('Users').findOneAndUpdate(
	// 	{
	// 	name: "nick"
	// 	}, 
	// 	{ 
	// 		$set: {
	// 		name: "matt"
	// 		}
	// 	}, {
	// 		returnOriginal: false
	// 	}).then((res) => {
	// 	console.log(res)
	// })

	db.collection('Users').findOneAndUpdate(
		{ _id: new ObjectID("5a1d5ee121875e87a9f5c496")}, 
		{ $inc: {age: -2}}, 
		{returnOriginal: false}).then((res) => {
		console.log(res)
	})

});