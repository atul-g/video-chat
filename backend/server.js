const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

app.use(express.static(path.join(__dirname, '/../frontend/build')))
//app.use(express.static(path.join(__dirname, '/../frontend/public')))

//over here, api routes should come

//any other url is handled by react routers
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'))
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server started at port 5000')
})
