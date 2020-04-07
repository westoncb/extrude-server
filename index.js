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
const MAX_PLAYERS = 10

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

                    if (Object.values(players).length >= MAX_PLAYERS) {
                        socket.emit("event", { type: "entrance_denied", reason: "too many players: " + Object.values(players).length })
                        break;
                    }
                        

                    players[data.player.id] = { ...data.player}
                    sockets[data.player.id] = socket
                    io.emit("event", { ...data, type: "player_enter", player: data.player })

                    const playerKeys = Object.keys(players)
                    if (playerKeys.length > 1) {

                        const selectedKey = playerKeys.find(key => (key !== data.player.id && sockets[key]))
                        console.log("Requesting full state from: ", players[selectedKey].name)
                        sockets[selectedKey].emit("event", { type: "full_state_request"})
                    }

                    console.log("all players", Object.keys(players).map(key => players[key].name))

                    break;
                case "full_state_response":
                    players = data.state.players
                    io.emit("event", { type: "full_state_update", state: data.state })
                    break
                case "chat_message":
                    io.emit("event", data)
                    break;
                case "player_target_change":
                    io.emit("event", data)
                    break;
                case "update_player":
                    io.emit("event", data)
                    break;
                case "update_structure":
                    io.emit("event", data)
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

        delete sockets[id]
        delete players[id]

        if (id && player) {
            console.log("removing player/socket: ", player)
            io.emit("event", { type: "player_exit", player })
        } else {
            console.log("undefined player. Players, Sockets:", Object.keys(players), Object.keys(sockets))
        }
    })
})
