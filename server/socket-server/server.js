require('dotenv').config();
const server = require('http').createServer();
const options = { /* ... */ };
const io = require('socket.io')(server, options);

io.on('connection', socket => { /* ... */ });

server.listen(process.env.WEBSOCKET_PORT);