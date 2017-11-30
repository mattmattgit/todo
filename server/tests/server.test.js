const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server.js')
const {Todo} = require('./../models/todo.js')

const todos = [{
	_id: new ObjectID(),
	text: 'something to do'
},{
	_id: new ObjectID(),
	text: 'something else to do',
	completed: true,
	completedAt: 333
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		Todo.insertMany(todos)
	}).then(() => done());
});

describe('POST/todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Text todo text'
		request(app)
			.post('/todos')
			.send({
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			Todo.find().then((todos) => {
				expect(todos.length).toBe(3);
				expect(todos[2].text).toBe(text);
				done();
			}).catch((e) => done())
			});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send()
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done()
				}
			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done())
			})
	})
});

describe('GET/todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2)
			})
			.end(done)

	});
});

describe('GET/todos/:id', () => {
	it('should get a specific todo', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done)
	});

	it('should return 404 if todo not found', (done) => {
	request(app)
		.get(`/todos/${new ObjectID('6a1ff110f97cac9db90524ff')}`)
		.expect(404)
		.end(done)
	});

	it('should return 404 if not valid ID', (done) => {
	request(app)
		.get(`/todos/6a1ff110f97cac9db90524ff`)
		.expect(404)
		.end(done)
	});
});

describe('DELETE/todos/:id', () => {
	it('should delete a specific todo', (done) => {
		var id = todos[0]._id.toHexString()
		request(app)
			.delete(`/todos/${id}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(id);
			})
			.end((err, res) => {
				if (err) {
					return done(err)
				}
				Todo.findById(id).then((todo) => {
					expect(todo).toBe(null)
					done()
				}).catch((e) => done(e))	
			})
	});

	it('should return 404 if id not found', (done) => {
		request(app)
		.get(`/todos/${new ObjectID('6a1ff110f97cac9db90524ff')}`)
		.expect(404)
		.end(done)
	});

	it('should return 404 if not valid ID', (done) => {
		request(app)
		.get(`/todos/6a1ff110f97cac9db90524ff`)
		.expect(404)
		.end(done)
	});
})

describe('PATCH/todos/:id', () => {
	it('should update the todo', (done) => {
		var id = todos[0]._id.toHexString()
		var text = 'howdy ho'
		request(app)
			.patch(`/todos/${id}`)
			.send({
				text: `${text}`,
				completed: true
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(id);
			})
			.end((err, res) => {
				if (err) {
					return done(err)
				}
				Todo.findById(id).then((todo) => {
					expect(todo.text).toBe(text)
					expect(todo.completed).toBe(true)
					done()
				}).catch((e) => done(e))
			});

	})

	it('should clear completed at when completed is false', (done) => {
		var id = todos[1]._id.toHexString()
		request(app)
			.patch(`/todos/${id}`)
			.send({completed: false})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(id)
			})
			.end((err,res) => {
				if (err) {
					return done(err)
				}
				Todo.findById(id).then((todo) => {
					expect(todo.completed).toBe(false)
					expect(todo.completedAt).toBe(null)
					done()
				}).catch((e) => done(e))
			})

	})
})

