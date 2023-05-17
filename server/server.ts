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

import socketFunctions from './helpers/socketFunctions';
import { type } from 'os';
socketFunctions(io, prisma);

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

app.get('/mainGoals', async (req, res) => {
  if (req.query) {
    const mainGoals = await prisma.main_goals.findMany({
      where: {
        user_id: Number(req.query.userID),
      },
    });
    return res.json({ success: true, result: mainGoals });
  }
  else {
    return res.json({ success: false });
  }
});

app.put('/mainGoals/new', async (req, res) => {
  if (req.body) {
    const mainGoals = await prisma.main_goals.create({
      data: {
        user_id: Number(req.body.userID),
        title: req.body.goal.title,
      },
    });
    return res.json({ success: true, result: mainGoals });
  }
  else {
    return res.json({ success: false });
  }
});





server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));