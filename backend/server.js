const express = require('express');
const app = express();

const server = require('http').Server(app);

app.get('/', (req, res) => {
    res.status(200).send("/Hello Atulu!")
})

app.get('/:meetid', (req, res) => {
    console.log("called")
    res.status(200).send(`asdfsdf`)
})

server.listen(5000, () => {
    console.log('yessssssss')
})
