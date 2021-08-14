const { CodeExecutorController } = require('./controllers/CodeExecutorController')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.port || 8080

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.post('/with_tests', (req, res) => {
    CodeExecutorController.executeWithTests(req.body)
        .then(result => res.send(result))
        .catch(err => {
            res.status(400).send(err.message)
        })
})

app.listen(port, () => {
    console.log(`App ready on port ${port}!`)
})

module.exports = app