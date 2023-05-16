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
const bcrypt = require('bcrypt');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

import { PrismaClient } from '@prisma/client';
import { triggerAsyncId } from 'async_hooks';
const prisma = new PrismaClient();

//Add any middleware here

app.use(morgan('dev'));
app.use(express.json()); //parse the body of axios post request
app.use(cookieParser());

//CUSTOM MIDDLEWARE if token cookie exists, decode it and set it for easy access
// app.use((req, res, next) => {
//   if (req.cookies.token) {
//     jwt.verify(req.cookies.token, secret, (err, decoded) => {
//       if (err) {
//         return next();
//       }

//       userToken = decoded;
//       return next();
//     });
//   }
//   return next();
// });

//Changed the verify request to be async (which doesn't work well with the next() statements above.
//If the user changes their credentials on another computer, we don't want them to be automatically signed in,
//so we need to actually validate the cookie against the database)
let userToken = null;

app.get('/verify', async (req, res) => {
  userToken = await jwt.verify(req.cookies.token, secret, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });


  if (!userToken) {
    return res.clearCookie("token").json({ success: false });
  }
  const user = await prisma.users.findUnique({
    where: {
      email: userToken.email
    }
  });

  //Since we're storing the hash in the token, here we can compare it directly without bcrypt
  if (!user || userToken.password !== user.password) {
    console.log(user);
    return res.clearCookie("token").json({ success: false });
  }
  return res.json({ user, success: true });
});

app.get('/', (req, res) => {
  return res.json({ greetings: "Universe" });
});

app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await prisma.users.upsert({
    where: { email: req.body.email },
    update: {},
    create: {
      email: req.body.email,
      username: req.body.userName,
      password: hashedPassword
    },
  });
  return res.json({ success: true });
});

app.post('/login', async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.json({ success: false });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (passwordMatch) {
    let token = jwt.sign(user, secret, { expiresIn: 129600 });
    console.log(token);
    return res.cookie("token", token).json({ success: true, user });
  }
  else {
    return res.json({ success: false });
  }
});

app.post('/logout', (req, res) => {
  return res.clearCookie('token').json({ success: true });
});

const users = {};
let connection = [];

// https://socket.io/docs/v3/emit-cheatsheet/

io.on('connection', socket => {
  const id = socket.handshake.auth.user;
  users[id] = socket.id;
  console.log(users);

  updateBuddy(socket, id);
  getMessages(socket, id);

  // //The following connection related conditions are placeholder to keep track of most recent logins, they'll be replaced with matching buddies
  // if (users.length >= 2) {
  //   const user1 = users[users.length - 1];
  //   const user2 = users[users.length - 2];
  //   connection = [{ ...user1, buddy: user2.user }, { ...user2, buddy: user1.user }];
  // }

  // if (connection.length === 2) {
  //   socket.to(connection[0].id).emit('BUDDY_ONLINE', true);
  //   socket.to(connection[1].id).emit('BUDDY_ONLINE', true);
  //   socket.emit('BUDDY_ONLINE', true);
  // }

  socket.on('MESSAGE_SEND', async payload => {
    console.log(payload);
    return prisma.messages.create({
      data: { ...payload }
    })
      .then(data => {
        console.log(data);
        console.log(users[payload.receiver_id]);
        socket.to(users[payload.receiver_id]).emit('MESSAGE_RECEIVE', data);
      });
  });

  // //Remove the user object from the users array upon disconnection to clean up the session
  socket.on('disconnect', async reason => {
    console.log(socket.id, reason);
    // Find user ID of the user who got disconnected
    const userID = Object.keys(users).find(key => users[key] === socket.id);
    console.log(userID);
    // Find their buddy
    const buddy = await prisma.users.findFirst({
      where: { buddy_id: Number(userID) },
      select: { id: true, username: true }
    });
    if (buddy) {
      const socketID = users[buddy.id];
      if (!socketID) {
        return;
      }
      const payload = { online: false };
      socket.to(socketID).emit('BUDDY_UPDATE', payload);
    }
  });
});

const updateBuddy = async function(socket, id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      username: true,
      buddy_id: true
    }
  });

  if (!user.buddy_id) {
    return;
  }

  const buddy = await prisma.users.findUnique({
    where: {
      id: user.buddy_id
    },
    select: {
      id: true,
      username: true
    }
  });
  const buddyOnline = buddy.id in users;
  const payload = { id: buddy.id, name: buddy.username, online: buddyOnline };
  console.log(users[id]);
  socket.emit('BUDDY_UPDATE', payload);
  if (buddyOnline) {
    socket.to(users[buddy.id]).emit('BUDDY_UPDATE', { online: true });
  }
};

const getMessages = async function(socket, id) {
  const messages = await prisma.messages.findMany({
    where: {
      OR: [
        {
          sender_id: id
        },
        {
          receiver_id: id
        }
      ]
    },
    select: {
      sender_id: true,
      content: true,
      created_at: true
    },
    orderBy: {
      created_at: "asc"
    }
  });
  socket.emit('MESSAGE_HISTORY', messages);
};


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));