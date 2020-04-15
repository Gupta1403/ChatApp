const express = require("express");
const socketio = require("socket.io");
const bodyparser = require("body-parser");
const http = require("http");
const cors = require("cors");
const router = require('./src/router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/user')
const port = process.env.PORT || 5000;
const app = express(http);
const server = http.createServer(app)
const io = socketio(server);

const path = require('path')

app.set('socketio', io)

app.use(bodyparser.json());
app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ email, name, roomId }, callback) => {
    const { error, user } = addUser({ id: socket.id, email, name, roomId });
    if (error) return callback(error);

    socket.join(user.roomId);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.roomId}.` });
    socket.broadcast.to(user.roomId).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.roomId).emit('roomData', { room: user.roomId, users: getUsersInRoom(user.roomId) });

    callback();
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.roomId).emit('message', { user: user.name, email: user.email, text: message });

    callback();
  });

  socket.on('startprivate', ({ privatechatObj }, callback) => {
    const user = getUser(socket.id);
    user["recText"] = privatechatObj.chatText;
    io.to(privatechatObj.id).emit('privateText', { userFrom: user });
    callback();
  })

  socket.on('disconnect', () => {
    console.log("disconnected")
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.roomId).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.roomId).emit('roomData', { room: user.roomId, users: getUsersInRoom(user.roomId) });
    }
  })
})

//Step-3
if(process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get( '*', (req, res) => {
        res.sendFile( path.join(__dirname, 'client', 'build') )
    })
}

server.listen(port, () => console.log(`server started at ${port}`));

module.exports = server;