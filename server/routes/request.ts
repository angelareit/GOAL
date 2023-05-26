const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

router.get('/incoming', async (req, res) => {
  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  try {
    const result = await prisma.buddy_requests.findMany({
      where: {
        to_user: userToken.id,
        is_deleted: false
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        users_buddy_requests_from_userTousers: true
      }
    });
    console.log(result);
    res.send(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/outgoing', async (req, res) => {
  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  try {
    const result = await prisma.buddy_requests.findMany({
      where: {
        from_user: userToken.id,
        is_deleted: false
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        users_buddy_requests_to_userTousers: true
      }

    });
    res.send(result);

  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/incoming/accept', async (req, res) => {

  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  console.log('REquest', req.body.r_id);
  try {
    //set buddy request to deleted
    const request = await prisma.buddy_requests.update({
      where: {
        id: req.body.r_id
      },
      data: {
        is_deleted: true
      }
    });

    //add buddy to the database
    const acceptingUser = await prisma.users.update({
      where: {
        id: userToken.id
      },
      data: {
        buddy_id: req.body.b_id
      }
    });

    const requestingUser = await prisma.users.update({
      where: {
        id: req.body.b_id
      },
      data: {
        buddy_id: userToken.id
      }
    })
    res.send({ request, acceptingUser, requestingUser });
      }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/incoming/reject', async (req, res) => {
  const r_id = parseInt(req.body.r_id);
  console.log('REquest', req.body.r_id);
  try {
    const result = await prisma.buddy_requests.update({
      where: {
        id: r_id
      },
      data: {
        is_deleted: true
      }
    });
    res.send({ result });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;