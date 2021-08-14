const { CodeExecutorService } = require('./controllers/CodeExecutorService')
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.post('/with_tests', (req, res) => {
    CodeExecutorService.executeWithTests(req.body)
        .then(result => res.send(result))
        .catch(err => {
            res.status(400).send(err.message)
        })
})

module.exports = app