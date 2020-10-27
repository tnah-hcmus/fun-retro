const wsServer = require('./server');
// Client-connection Pool
const clients = {};

// This code generates unique userid for everyuser.
const _createUUID = () => {
    let guid = 'xxyxxyxx-xxxx-4xxx-yxxx-xxxxxxxxyxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return guid;
}

wsServer.on('request', (request) => {
  const userID = _createUUID();
  console.log((new Date()) + ' Received a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
});