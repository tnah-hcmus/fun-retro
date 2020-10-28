require('dotenv').config();
module.exports = function(app) {
    //set up socket
    const fs = require('fs');
    const server = require('https').createServer({
    key: fs.readFileSync('server/ssl/key.pem'),
    cert: fs.readFileSync('server/ssl/cert.pem')
    }, app);
    const options = { /* ... */ };
    const io = require('socket.io')(server, options);
    let boardPool = {};
    io.origins((origin, callback) => {
        console.log(origin)
        if (origin !== 'https://retro-1712039.herokuapp.com') {
            return callback('origin not allowed', false);
        }
        callback(null, true);
      });

    io.on('connection', socket => { 
        //on first connection     
        const boardId = socket.handshake.query.boardId;
        if(!boardPool[boardId] && !Array.isArray(boardPool[boardId] )) boardPool[boardId] = [socket.id]
        else boardPool[boardId].push(socket.id);
        console.log(boardPool);
        //on disconnect
        socket.on('disconnect', () => {      
            const i = boardPool[boardId].indexOf(socket);
            boardPool[boardId].splice(i, 1);
        });
        
        //on new taskList
        socket.on('send-new-task-list', (data) => {
            const {task, id} = data;
            if(boardPool[id]) {
                for(const socketId of boardPool[id]) {
                    if(socketId != socket.id) {
                        socket.broadcast.to(socketId)
                        .emit('receive-new-task-list', task);
                    }

                }
            }        
        });

        //on new name
        socket.on('send-new-board-name', (data) => {
            const {name, id} = data;
            if(boardPool[id]) {
                for(const socketId of boardPool[id]) {
                    socket.broadcast.to(socketId)
                    .emit('receive-new-board-name', name);
                }
            }            
        });

        //on send disconnect
        socket.on('send-disconnect-request', () => {
            socket.disconnect(true);           
        });
    });
    server.listen(process.env.WEBSOCKET_PORT);
}   


