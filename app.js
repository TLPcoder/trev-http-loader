const express = require('express');
const app = express();
const trev = require('./trev-root');
const PORT = 8080;

app.get('/', (req,res,next) => {
    trev().request(1).concurrency(1).rateLimit(30).contentType('application/type')
    .method('GET').headers({hello: 'world', something: 1, it: 'worked'}).setUrl('http://localhost:8080/').run()

    trev().request(20).concurrency(20).rateLimit(30).contentType('application/type')
    .method('GET').setUrl('http://localhost:8080/').run()
    res.status(200).json({hello: 'world'});
})

app.listen(8080, () => {
    console.log('listening on port ', PORT);
})