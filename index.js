const express = require('express');
const socketIO = require('socket.io');
const path = require('path')

const PORT = process.env.PORT || 5000;
const INDEX = '/build/index.html';

const app = express()
    
const server = app.listen(PORT, () => console.log(`Listenings on ${PORT}`));

app.use(express.static(path.join(__dirname, 'build')));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});
