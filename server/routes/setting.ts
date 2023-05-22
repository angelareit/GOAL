const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

router.post('/availability', async (req,res) => {
  console.log(req.body.avilability)
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
        buddy_availability: req.body.avilability
      }
    });
    res.send({ result });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

router.post('/interest', async (req,res) => {
  const i_id = req.body.interest_id
  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  try {
    const result = await prisma.interests.findMany({
      where: { user_id: userToken.id },
      select: {
        category_id: true,
      },
  
    });
    console.log(result);
    const exists = result.some(obj => obj.category_id === i_id);
    if (exists){
      try {
        const deleteInterest = await prisma.interests.delete({
          where: {
            userCategory: {
            user_id: userToken.id,
            category_id: i_id
            }
          },
        });
    
        console.log('Interest deleted:', deleteInterest);
        return (deleteInterest)
      } catch (error) {
        console.error('Error deleting interest:', error);
      }
    
    } else {
      try {
        const addInterest = await prisma.interests.create({
          data: {
            user_id: userToken.id,
            category_id: i_id
          },
        });
    
        console.log('Interest added:', addInterest);
      } catch (error) {
        console.error('Error adding interest:', error);
      }
    }


  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

export default router;
