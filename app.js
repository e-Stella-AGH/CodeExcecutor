const { CodeExecutorService } = require('./services/CodeExecutorService')
const express = require('express')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {RabbitService} = require("./services/RabbitService");

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.post('/with_tests', (req, res) => {
    CodeExecutorService.executeWithTests(req.body)
        .then(result => {
            RabbitService.sendResults(result)
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send(err.message)
        })
})

module.exports = app