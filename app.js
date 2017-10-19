const express = require('express');
const app = express();
const trev = require('./trev-root');
const bodyParser = require('body-parser')
const PORT = 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    trev('testing 1').request(1).concurrency(1).timeout(30).contentType('application/json')
    .method('POST').requestBody({testing: '1'}).acceptHeader('application/json').headers({hello: 'world', something: 1, it: 'worked'}).setUrl('http://localhost:8080/do/something/else').run()

    trev('testing 2').request(1).concurrency(1).timeout(30).contentType('application/json')
    .method('POST').requestBody({testing:'2'}).setUrl('http://localhost:8080/do/something/else').run()
    res.status(200).json({hello: 'world'});
})

app.post('/do/something/else', (req, res, next) => {
    console.log('headers', req.headers)
    console.log(req.body);
    res.json('it worked!');
})

app.listen(8080, () => {
    console.log('listening on port ', PORT);
})