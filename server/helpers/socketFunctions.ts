// https://socket.io/docs/v3/emit-cheatsheet/

const socketFunctions = function(io, prisma) {
  const users = {};

  io.on('connection', socket => {
    const id = socket.handshake.auth.user;
    // If for some reason a user connects to our socket without being logged in (which shouldn't happen), disconnect them.
    if (!id) {
      return io.disconnect();
    }
    users[id] = socket.id;
    console.log(users);

    //Update the user's buddy that they just got online
    // updateBuddy(socket, id);

    //Retrieve message history
    // getMessages(socket, id);

    // Event listener for when the user sends a message
    socket.on('MESSAGE_SEND', async payload => {
      console.log(payload);
      return prisma.messages.create({
        data: { ...payload }
      })
        .then(data => {
          //console.log(data);
          //console.log(users[payload.receiver_id]);
          socket.to(users[payload.receiver_id]).emit('MESSAGE_RECEIVE', data);
        });
    });

    socket.on('MESSAGE_DELETE', async payload => {
      console.log(payload);
      return prisma.messages.update({
        where: {
          id: payload.id
        },
        data: {
          is_deleted: true
        }
      }).then(() => {
        socket.to(users[payload.receiver_id]).emit('MESSAGE_DELETE', { message: payload });
      }).catch(err => {
        console.log(err);
      });
    });

    socket.on('GET_BUDDY_INFO', payload => {
      updateBuddy(socket, id);
    });

    socket.on('MESSAGE_HISTORY', payload => {
      getMessages(socket, id);
    });

    socket.on('BUDDY_PROGRESS_UPDATE', async payload => {
      console.log('SERVER PROGRESS', payload.id);

      getBuddyProgress(socket, payload.id);
    });


    //Remove the user object from the users array upon disconnection to clean up the session and update their buddy
    socket.on('disconnect', async reason => {
      console.log(socket.id, reason);
      // Find user ID of the user who got disconnected
      const userID = Object.keys(users).find(key => users[key] === socket.id);
      console.log(userID);

      if (!userID) {
        return;
      }
      // Find their buddy
      const buddy = await prisma.users.findFirst({
        where: { buddy_id: Number(userID) },
        select: { id: true, username: true }
      });
      if (buddy) {
        const socketID = users[buddy.id];
        if (socketID) {
          const payload = { online: false };
          socket.to(socketID).emit('BUDDY_UPDATE', payload);
        }
      }
      delete users[userID];
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
    //   console.log(users[id]);
    socket.emit('BUDDY_UPDATE', payload);
    if (buddyOnline) {
      socket.to(users[buddy.id]).emit('BUDDY_UPDATE', { online: true });
    }
  };

  const getMessages = async function(socket, id) {
    const messages = await prisma.messages.findMany({
      where: {
        NOT: {
          is_deleted: true
        },
        OR: [
          {
            sender_id: id
          },
          {
            receiver_id: id
          }
        ]
      },
      // select: {
      //   sender_id: true,
      //   content: true,
      //   created_at: true
      // },
      orderBy: {
        created_at: "asc"
      }
    });
    socket.emit('MESSAGE_HISTORY', messages);
  };

  const getBuddyProgress = async function(socket, id) {
    console.log('IM HERE, ', id);
    //Id refers to buddy ID. If it's null, i.e. the user doesn't have a buddy, do nothing
    if (!id) {
      return;
    }

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
    let buddy_id = user.buddy_id;
    if (buddy_id) {
      const currentDate = new Date();
      const d = new Date();
      d.setDate(currentDate.getDate() - 14);

      const subGoals = await prisma.sub_goals.findMany({
        where: {
          main_goals: {
            user_id: Number(buddy_id),
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
          user_id: Number(buddy_id),
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

      socket.to(users[id]).emit('BUDDY_PROGRESS', { success: true, before: d, goalCounts: groupedGoalCounts, subGoalHistory: groupedSubGoals });

      //  socket.emit('BUDDY_PROGRESS', { success: true, before: d, goalCounts: groupedGoalCounts, subGoalHistory: groupedSubGoals });
    }
    else {
      socket.to(users[id]).emit('BUDDY_PROGRESS', { success: false });
    }
  };

};

export default socketFunctions;