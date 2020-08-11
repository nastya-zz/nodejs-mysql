const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const path = require('path')
const sequelize = require('./utils/database')

const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use(graphqlHTTP({
	schema: schema,
	rootValue: resolver,
	graphiql: true
}))

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
