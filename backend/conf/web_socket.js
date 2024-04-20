const WebSocket = require('ws');
const websocket = new WebSocket.Server({ port: 8000 });


module.exports = websocket;
