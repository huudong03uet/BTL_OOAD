const WebSocket = require('ws');
const websocket = new WebSocket.Server({ port: 8000 });


websocket.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });

    ws.on('error', (error) => {
        console.error('WebSocket Error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket Connection Closed');
    });
});

module.exports = websocket;
