const express = require('express');
const socketIO = require('socket.io');
const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express()
    
const server = app.listen(PORT, () => console.log(`Listenings on ${PORT}`));

app.use(express.static(path.join(__dirname, 'build')));

const io = socketIO(server);

let players = {}
const sockets = {}

io.on('connection', socket => {
    console.log('Client connected', socket.id)

    socket.on('disconnect', () => console.log('Client disconnected'))

    socket.on('event', data => {
        console.log("client event", data)

        if (data.type.startsWith("input_")) {

            io.emit("event", { ...data })
        } else {

            switch (data.type) {
                case "player_enter_request":

                    players[data.player.id] = { ...data.player}
                    sockets[data.player.id] = socket
                    io.emit("event", { ...data, type: "player_enter", player: data.player })

                    const playerKeys = Object.keys(players)
                    if (playerKeys.length > 1) {
                        console.log("sending that full state request")
                        sockets[playerKeys.find(key => key !== data.player.id)].emit("event", { type: "full_state_request"})
                    }
                    break;
                case "full_state_response":
                    players = data.state.players
                    io.emit("event", { type: "full_state_update", state: data.state })
                    break
                case "player_exit":
                    // not sure what this shit is about
                    // delete sockets[id]
                    // delete players[id]
                    // io.emit("event", { ...data, op: { type: "r", id: data.player.id } })
                    break;
                default:
                    console.log("unrecognized client event: ", data)
                    break;
            }
        }
    })

    socket.on("disconnect", info => {
        console.log("disconnect event: ", info)
        const index = Object.keys(sockets).map(key => sockets[key]).findIndex(s => s === socket)
        const id = Object.keys(sockets)[index]
        const player = players[id]

        console.log("removing player/socket with id: ", id)

        delete sockets[id]
        delete players[id]

        socket.emit("event", {type: "player_exit", player})
    })
})
