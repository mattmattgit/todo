var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
	var newTodo = new Todo( {
		text: req.body.text
	})

	newTodo.save().then((r) => {
		res.send(r);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req,res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req,res) => {
	let id = req.params.id
	if(!ObjectID.isValid(id)){
		return res.status(400).send()
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => res.status(400).send());
})

app.delete('/todos/:id', (req,res) => {
	let id = req.params.id
	if(!ObjectID.isValid(id)){
		return res.status(404).send('Not a valid ID');
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			res.status(404).send('No todos with that ID');
		}
		res.status(200).send({todo});
	}).catch((e) => res.status(400).send('Error'));
})

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

module.exports = {app};