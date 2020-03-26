const express = require('express');
const socketIO = require('socket.io');
const path = require('path')

const PORT = process.env.PORT || 3000;
const INDEX = '/build/index.html';

const app = express()
    
const server = app.listen(PORT, () => console.log(`Listenings on ${PORT}`));

app.use(express.static(path.join(__dirname, 'build')));

const io = socketIO(server);

io.on('connection', socket => {
    console.log('Client connected', socket.id)
    socket.on('disconnect', () => console.log('Client disconnected'))
    socket.on('player_input', data => {
        console.log("player_input", data)
        socket.emit("player_input_relay", { ...data, blah: "test" })
    })
})
