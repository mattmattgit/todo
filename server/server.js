var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
	console.log(req.body);
	var newTodo = new Todo( {
		text: req.body.text
	})

	newTodo.save().then((r) => {
		console.log('saved', r)
		res.send(r);
	}, (e) => {
		console.log('not saved', e)
		res.status(400).send(e);
	})
});

app.listen(3000, () => {
	console.log('listening on port 3000');
})

module.exports = {app};