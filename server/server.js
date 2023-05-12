const PORT = 8080;

const express = require('express');
const morgan = require('morgan');

const app = express();

http = require('http');
server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Add any middleware here

app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.json({ greetings: "Universe" });
});

const users = [];
const connection = [];

io.on('connection', socket => {
  const user = { user: socket.handshake.auth.user, buddy: socket.handshake.auth.buddy, id: socket.id };
  if(!users.includes(user)) {
    users.push(user);
    connection.push(user);
  }

  if(connection.length > 2) {
    connection.shift();
  }

  if(connection.length === 2) {
    // if(connection[0].user === connection[1].buddy){
    if(true){
      console.log(connection[0].user, connection[1].user);
      socket.to(connection[0].id).emit('BUDDY_ONLINE', true);
      socket.to(connection[1].id).emit('BUDDY_ONLINE', true);
    }
  }

  console.log("Connection:", connection);


  socket.on('MESSAGE_SEND', payload => {
    console.log(payload);
    socket.broadcast.emit('MESSAGE_RECEIVE', payload);
  })
  // https://socket.io/docs/v3/emit-cheatsheet/
  
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));