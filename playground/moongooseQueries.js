const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')

var id = '5a1d7e530755f68911ed9a1411';

if (!ObjectID.isValid(id)) {
	console.log('ID is not valid');
};

User.findById(id).then((user) => {
	if (!user) {
		return console.log('User not found')
	}
	console.log(user)
}).catch((e) => e);
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos)
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('Id not found')
// 	}
// 	console.log('Todo by Id:', todo)
// }).catch((e) => (e))
