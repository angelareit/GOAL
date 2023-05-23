const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
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

router.put('/new', async (req, res) => {
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
export default router;

