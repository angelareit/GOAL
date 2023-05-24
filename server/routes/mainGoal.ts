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

const deleteSubGoals = async function(id) {

  await prisma.sub_goals.deleteMany({
    where: {
      main_goal_id: id
    },
  });
};

router.delete('/', async (req, res) => {
  const id = Number(req.query.id);
  if (!id) {
    return res.json({ success: false });
  }

  await prisma.main_goals.delete({
    where: {
      id: id
    }
  }).catch(err => {
    console.log(err);
  });

  deleteSubGoals(id)
    .catch(err => {
      console.log(err);
      return res.json({ success: false });
    });
  res.json({ success: true });

});

export default router;

