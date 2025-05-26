const ws = require('ws');
const server = new ws.Server({port: 8080});
const clients = new Set();

server.on("connection", (socket) => {

    console.log('New client connected');

    clients.add(socket);
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        socket.send(`You said: ${message}`);
        
        for (client of clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN){
                client.send(`Other said: ${message}`);
            }
        }
    });

    socket.on("close",() => {
        console.log('Client disconnected');
        clients.delete(socket);
    });



});