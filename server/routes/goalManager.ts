const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// SUB GOALS

//Get all children
router.get('/', async (req, res) => {
  const goal = req.query.goal;
  const goalID = Number(goal.id);
  const isMainGoal = !goal.main_goal_id;
  let childrenGoals = null;

  if (!isMainGoal) {

    childrenGoals = await prisma.sub_goals.findMany({
      where: {
        is_deleted: false,
        goal_relationship_goal_relationship_child_idTosub_goals: {
          some: {
            parent_id: goalID
          }
        }
      },
      orderBy: {
        created_at: 'asc'
      }
    });

    console.log(childrenGoals);


  } else {
    childrenGoals = await prisma.$queryRaw`SELECT sub_goals.*, g.parent_id FROM sub_goals LEFT OUTER JOIN goal_relationship g ON sub_goals.id = g.child_id WHERE g.parent_id IS null AND sub_goals.is_deleted = false ORDER BY created_at asc`;
    console.log(childrenGoals);
  }

  res.send({ children: childrenGoals });
});

//Modify a sub-goal
router.put('/', async (req, res) => {
  const { updatedGoal } = req.body;

  const check = await prisma.sub_goals.update({
    where: {
      id: updatedGoal.id
    },
    data: {
      title: updatedGoal.title,
      note: updatedGoal.note,
      due_date: updatedGoal.due_date,
      completed_on: updatedGoal.completed_on,
      priority: updatedGoal.priority
    }
  });
  console.log(check);
  res.send("Success!");

});

//Add new sub-goal
router.post('/', async (req, res) => {
  const { newGoal } = req.body;
  const createdGoal = await prisma.sub_goals.create({
    data: {
      title: newGoal.title,
      note: newGoal.note,
      priority: newGoal.priority,
      main_goal_id: newGoal.main_goal_id,
      due_date: newGoal.due_date,
    }
  });
  console.log(createdGoal);
  if (newGoal.parent_id) {
    await prisma.goal_relationship.create({
      data: {
        parent_id: newGoal.parent_id,
        child_id: createdGoal.id
      }
    });
  }
  res.json({ id: createdGoal.id, created_at: createdGoal.created_at });

});

//Delete Subgoal, recursive helper function
const deleteSubGoal = async function(id) {

  const childrenIDs = await prisma.goal_relationship.findMany({
    where: {
      parent_id: id
    }
  });

  childrenIDs.forEach(async c => {
    // prisma.goal_relationship.delete({
    //   where: {
    //     child_id: c.child_id
    //   }
    // })
    await deleteSubGoal(c.child_id);
  });

  await prisma.sub_goals.delete({
    where: {
      id: id
    },
  });

  // Alternate code if we want to just mark them as "is_deleted" instead, not tested
  // await prisma.sub_goals.update({
  //   where: {
  //     id: id
  //   },
  //   data: {
  //     is_deleted: true
  //   }
  // })

};

//Delete Subgoal
router.delete('/', async (req, res) => {
  const id = Number(req.query.id);
  deleteSubGoal(id)
    .catch(err => {
      console.log(err);
      return res.json({ success: false });
    });
  res.json({ success: true });

});

export default router;