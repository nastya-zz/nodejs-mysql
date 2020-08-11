const Todo = require('../models/todo')

const users = [
	{
		name: 'Max',
		age: 35,
		email: 'x@s.com'
	},
	{
		name: 'Olya',
		age: 15,
		email: 'x@sg.com'
	}
]

module.exports = {
	test() {
		return {
			count: Math.trunc(Math.random() * 10),
			users: users
		}
	},
	random({min, max, count}) {
		const arr = []
		 for (let i=0; i < count; i++) {
		 	const random = Math.random() * (max - min) + min
		 	arr.push(random)
		 }
		 return arr
	},
	addTestUser({user: {name, email}}) {
		const user = {
			name, email,
			age: Math.ceil(Math.random() * 30)
		}
		users.push(user)

		return user
	},

	async getTodos() {
		try {
			return await Todo.findAll()
		} catch (e) {
			throw new Error('Fetch todos id not available')
		}
	},

	async createTodo({todo}) {
		try {
			return await Todo.create({
				title: todo.title,
				done: false
			})

		} catch(e) {
			throw new Error('Title is required')
		}
	},

	async completeTodo({id}) {
		try {
			const todo = await Todo.findByPk(id)
			todo.done =  true
			await todo.save()

			return todo
		} catch(e) {
			throw new Error('Id is required')
		}
	},

	async deleteTodo({id}) {
		try {
			const todos = await Todo.findAll({
				where: {id}
			})

			const todo = todos[0]
			await todo.destroy()
			return true
		} catch(e) {
			throw new Error('Id is required')
			return false
		}
	}
}
