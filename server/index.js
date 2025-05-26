const ws = require('ws');
const server = new ws.Server({port: 8080});
const clients = new Set();

server.on("connection", (socket) => {

    console.log('New client connected');

    clients.add(socket);
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        const text = Buffer.isBuffer(message) ? message.toString('utf8') : message;
        socket.send(text);
        
        for (const client of clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN){
                client.send(message.toString());
            }
        }
    });

    socket.on("close",() => {
        console.log('Client disconnected');
        clients.delete(socket);
    });



});