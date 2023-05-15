const PORT = 6080;
//JWT: secret cryptographic key used to sign and verify tokens
const secret = "somekey";

const express = require('express');

const http = require('http');
const { connect } = require('http2');

const morgan = require('morgan');
const { userInfo } = require('os');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Add any middleware here

app.use(morgan('dev'));
app.use(express.json()); //parse the body of axios post request
app.use(cookieParser());

//CUSTOM MIDDLEWARE if token cookie exists, decode it and set it for easy access
app.use((req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, secret, (err, decoded) => {
      if (err) {
        res.token = undefined;
        return next();
      }

      req.token = decoded;
      return next();
    });
  }
  return next();
});

app.get('/verify', (req, res) => {
  if (req.token) {
    return res.json({ user: req.token, success: true });
  } else {
    return res.clearCookie("token").json({ success: false });
  }
});

app.get('/', (req, res) => {
  return res.json({ greetings: "Universe" });
});

app.post('/register', async (req, res) => {
  console.log(req.body);
  const newUser = await prisma.users.upsert({
    where: { email: req.body.email },
    update: {},
    create: {
      email: req.body.email,
      username: req.body.userName,
      password: req.body.password
    },
  });
  console.log(newUser);
  return res.json({ greetings: "Universe" });
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const user = await prisma.users.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.json({ success: false });
  }

  if (req.body.password === user.password) {
    const buddy = { name: null, online: false };
    if (user.buddy_id) {
      await prisma.users.findUnique({
        where: {
          id: user.buddy_id
        }
      });
    };
    let token = jwt.sign(user, secret, { expiresIn: 129600 });
    console.log(token);
    return res.cookie("token", token).json({ success: true, user, buddy });
  }
  else {
    return res.json({ success: false });
  }
});

app.post('/logout', (req, res) => {
  return res.clearCookie('token').json({ success: true });
});

const users = [];
let connection = [];

// https://socket.io/docs/v3/emit-cheatsheet/



io.on('connection', socket => {
  //Create an object with userID and socketID to keep track of currently online users
  const client = { user: socket.handshake.auth.user, id: socket.id };
  users.push(client);
  console.log("Users:", users);
  //The following connection related conditions are placeholder to keep track of most recent logins, they'll be replaced with matching buddies
  if (users.length >= 2) {
    const user1 = users[users.length - 1];
    const user2 = users[users.length - 2];
    connection = [{ ...user1, buddy: user2.user }, { ...user2, buddy: user1.user }];
  }

  if (connection.length === 2) {
    socket.to(connection[0].id).emit('BUDDY_ONLINE', true);
    socket.to(connection[1].id).emit('BUDDY_ONLINE', true);
    socket.emit('BUDDY_ONLINE', true);

    console.log("Connection:", connection);
  }

  socket.on('MESSAGE_SEND', payload => {
    console.log(connection);
    if (connection.length !== 2) {
      return socket.emit('MESSAGE_RECEIVE', { message: "Your buddy is currently offline.", user: 'Notice', time: Date.now });
    }
    //Get the index of the user whose buddy is sending the message
    const i = connection.findIndex(user => user.buddy === client.user);
    console.log(i);
    //Send the message to the user
    socket.to(connection[i].id).emit('MESSAGE_RECEIVE', payload);
  });

  //Remove the user object from the users array upon disconnection to clean up the session
  socket.on('disconnect', reason => {
    console.log(reason, socket.id);
    const userIndex = users.findIndex(user => user.id === socket.id);
    const disconnected = users.splice(userIndex, 1)[0];
    if (connection.length === 2) {
      const buddySocket = connection[connection.findIndex(u => u.buddy === disconnected.user)].id;
      socket.to(buddySocket).emit('BUDDY_ONLINE', false);
      connection = [];
    }
  });
});


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));