const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('send-audio-time', message => {
    socket.broadcast.emit('broadcast-audio-time', { message: message, name: users[socket.id] })
    console.log(`${users[socket.id]} is setting time to ${message.time}`)
  })
  socket.on('send-player-url', message => {
    socket.broadcast.emit('broadcast-player-url', { message: message, name: users[socket.id] })
    console.log(`${users[socket.id]} set player url to ${message}`)
  })
  socket.on('send-pausestate', message =>{
    socket.broadcast.emit('broadcast-pause-state', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})