require('dotenv').config();
module.exports = function(app) {
    //set up socket
    const server = require('http').createServer(app);
    const options = { origins: '*:*'};
    const io = require('socket.io')(server, options);
    let boardPool = {};

    io.on('connection', socket => { 
        //on first connection     
        const boardId = socket.handshake.query.boardId;
        if(!boardPool[boardId] && !Array.isArray(boardPool[boardId] )) boardPool[boardId] = [socket.id]
        else boardPool[boardId].push(socket.id);
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
                    if(socketId != socket.id) {
                        socket.broadcast.to(socketId)
                        .emit('receive-new-board-name', name);
                    }
                }
            }            
        });
        
        //on add task
        socket.on('send-add-task-request', (data) => {
            const {task, boardId} = data;
            if(boardPool[boardId]) {
                for(const socketId of boardPool[boardId]) {
                    if(socketId != socket.id) {
                    socket.broadcast.to(socketId)
                    .emit('receive-add-task-request', task);
                    }
                }                
            }            
        });

        //on delete task
        socket.on('send-delete-task-request', (data) => {
            const {id, boardId} = data;
            if(boardPool[boardId]) {
                for(const socketId of boardPool[boardId]) {
                    if(socketId != socket.id) {
                    socket.broadcast.to(socketId)
                    .emit('receive-delete-task-request', id);
                    }
                }
            }            
        });

        //on edit task
        socket.on('send-edit-task-request', (data) => {
            const {id, boardId, newInfo} = data;
            if(boardPool[boardId]) {
                for(const socketId of boardPool[boardId]) {
                    if(socketId != socket.id) {
                    socket.broadcast.to(socketId)
                    .emit('receive-edit-task-request', {id, info: newInfo});
                    }
                }
            }            
        });

        //on send disconnect
        socket.on('send-disconnect-request', () => {
            socket.disconnect(true);           
        });
    });
    server.listen(process.env.PORT);
}   


