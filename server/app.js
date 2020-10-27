const express = require('express');
const path = require('path');

require('dotenv').config();
require('./db/db');

const {urlGoogle} = require('./services/google-utils');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const boardRouter = require('./routers/board');
const port = process.env.PORT;
const router = express.Router();
boardRouter(router);
userRouter(router);
taskRouter(router);

const app = express();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

io.on('connection', socket => { console.log('New user connect') });

server.listen(process.env.WEBSOCKET_PORT);

app.use(express.static(path.join(__dirname, "../public/dist")));
app.get('/google/url', (req, res) => {
    res.send(urlGoogle())
})

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.use(router)


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})