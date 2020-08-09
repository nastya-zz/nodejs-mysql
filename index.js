const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const todoRoutes = require('./routes/todos')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use('/api/todo', todoRoutes)

app.use((req, res, next) => {
	res.sendFile('/index.html')
	next()
})

async function start() {
	try {
		await sequelize.sync()
		app.listen(PORT, () => {
			console.log(`Example app listening on port ${PORT}!`)
		})
	} catch(e) {
		console.log(e)
	}
}

start()
