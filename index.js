const express = require('express');
const socketIO = require('socket.io');
const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express()
    
const server = app.listen(PORT, () => console.log(`Listenings on ${PORT}`));

app.use(express.static(path.join(__dirname, 'build')));

const io = socketIO(server);

io.on('connection', socket => {
    console.log('Client connected', socket.id)

    socket.on('disconnect', () => console.log('Client disconnected'))

    socket.on('event', data => {
        console.log("client event", data)

        if (data.type.startsWith("input_")) {

            socket.emit("event", { ...data, time: new Date() })
        } else {

            switch (data.type) {
                case "player_enter_request":
                    socket.emit("event", { ...data, type: "player_enter", time: new Date() })
                    break;
                case "player_exit":
                    socket.emit("event", { ...data, time: new Date() })
                    break;
                default:
                    console.log("unrecognized client event: ", data)
                    break;
            }
        }
    })

    socket.on("disconnect", info => {
        console.log("disconnect event: ", info)
        socket.emit("event", {type: "player_exit", time: new Date()})
    })
})
