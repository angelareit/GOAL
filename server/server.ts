require('dotenv').config();
const PORT = 6080;
//JWT: secret cryptographic key used to sign and verify tokens
const secret = "somekey";

import express from 'express';

import http from 'http';
import { connect } from 'http2';

import morgan from 'morgan';
import { userInfo } from 'os';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app = express();
import bcrypt from 'bcrypt';

const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

import { PrismaClient, Prisma } from '@prisma/client';
import { triggerAsyncId } from 'async_hooks';


const prisma = new PrismaClient();

//Add any middleware here

app.use(morgan('dev'));
app.use(express.json()); //parse the body of axios post request
app.use(cookieParser());

//Routes imported and exportes in ES6 format
import requestRoutes from './routes/request';
import searchRoutes from './routes/search';
import subGoalRoutes from './routes/goalManager';
import settingRoutes from './routes/setting'

//mount search route
app.use('/search', searchRoutes);
app.use('/request', requestRoutes);
app.use('/subgoal', subGoalRoutes);
app.use('/setting', settingRoutes);

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
    //console.log(user);
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
    //console.log(token);
    return res.cookie("token", token).json({ success: true, user });
  }
  else {
    return res.json({ success: false });
  }
});

app.post('/logout', (req, res) => {
  return res.clearCookie('token').json({ success: true });
});

// API routes

app.get('/api/interests/:id', async (req, res) => {
  //console.log(req.cookies.token);
  const interests = await prisma.interests.findMany({
    where: {
      user_id: Number(req.params.id)
    }
  });
  const categories = await prisma.categories.findMany();
  res.json({ interests: interests.map(i => i.category_id), categories });
});

app.post('/interest/', async (req, res) => {
  const { category, user } = req.body;
  const result = await prisma.interests.upsert({
    where: {
      userCategory: {
        user_id: user,
        category_id: category
      }
    },
    update: {},
    create: {
      user_id: user,
      category_id: category
    }
  });
  res.json({ success: result ? true : false });
});

app.delete('/interest/', async (req, res) => {
  const { category, user } = req.body;
  const result = await prisma.interests.delete({
    where: {
      userCategory: {
        user_id: user,
        category_id: category
      }
    }
  });
  // console.log(result);
  res.json({ success: true });
});

app.get('/test', async (req, res) => {
  let userID = 1;
  if (true) {
    const currentDate = new Date();
    const d = new Date();
    d.setDate(currentDate.getDate() - 14);

    const subGoals = await prisma.sub_goals.findMany({
      where: {
        main_goals: {
          user_id: userID ,
        },
        completed_on: {
          gte: d.toISOString(),
          not: null,
        },
      },
      orderBy: {
        completed_on: 'desc',
      },
    });

    const groupedSubGoals = subGoals.reduce((result, subGoal) => {
      const { main_goal_id, ...rest } = subGoal;
      if (!result[main_goal_id]) {
        result[main_goal_id] = [];
      }
      result[main_goal_id].push(rest);
      return result;
    }, {});

    const goal_counts = await prisma.main_goals.findMany({
      where: {
        user_id: userID ,
      },
      select: {
        id: true,
        title: true,
        sub_goals: {
          select: {
            main_goal_id: true,
            completed_on: true,
          },
          take: 5
        },
      },
    });

    const groupedGoalCounts = goal_counts.map((mainGoal) => ({
      main_goal_id: mainGoal.id,
      main_goal_title: mainGoal.title,
      total_count: mainGoal.sub_goals.length,
      completed_count: mainGoal.sub_goals.filter((subGoal) => subGoal.completed_on !== null).length,
    }));


    return res.json({ success: true, before: d, goalCounts: groupedGoalCounts, subGoalHistory: groupedSubGoals });
  }
  else {
    return res.json({ success: false });
  }

});

//MAIN GOALS

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

app.get('/progress', async (req, res) => {

  if (req.query.userID) {
    const currentDate = new Date();
    const d = new Date();
    d.setDate(currentDate.getDate() - 14);

    const subGoals = await prisma.sub_goals.findMany({
      where: {
        main_goals: {
          user_id: Number(req.query.userID),
        },
        completed_on: {
          gte: d.toISOString(),
          not: null,
        },
      },
      orderBy: {
        completed_on: 'asc',
      },
    });

    const groupedSubGoals = subGoals.reduce((result, subGoal) => {
      const { main_goal_id, ...rest } = subGoal;
      if (!result[main_goal_id]) {
        result[main_goal_id] = [];
      }
      result[main_goal_id].push(rest);
      return result;
    }, {});

    const goal_counts = await prisma.main_goals.findMany({
      where: {
        user_id: Number(req.query.userID),
      },
      select: {
        id: true,
        title: true,
        sub_goals: {
          select: {
            main_goal_id: true,
            completed_on: true,
          },
          take: 5
        },
      },
    });

    const groupedGoalCounts = goal_counts.map((mainGoal) => ({
      main_goal_id: mainGoal.id,
      main_goal_title: mainGoal.title,
      total_count: mainGoal.sub_goals.length,
      completed_count: mainGoal.sub_goals.filter((subGoal) => subGoal.completed_on !== null).length,
    }));


    return res.json({ success: true, before: d, goalCounts: groupedGoalCounts, subGoalHistory: groupedSubGoals });
  }
  else {
    return res.json({ success: false });
  }
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT} `));