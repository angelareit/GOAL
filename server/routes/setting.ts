const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

router.post('/availability', async (req,res) => {
  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  try {
    const result = await prisma.users.update({
      where: {
        id: userToken.id
      },
      data: {
        buddy_availability: true
      }
    });
    res.send({ result });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


})

export default router;
