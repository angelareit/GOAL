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

io.on('connection', socket => {
  console.log('a user connected');

  // https://socket.io/docs/v3/emit-cheatsheet/
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));