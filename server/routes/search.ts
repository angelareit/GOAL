const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('This is the search route!');
});

//search for buddy
router.post('/', async (req, res) => {
  console.log('req body', req.body);

  try {
    //get the user
    const result = await prisma.users.findMany({
      where: {
        username: {
          contains: req.body.searchValue,
          mode: 'insensitive',
        },
        id: { not: req.body.userID,},
        buddy_availability: true,
        buddy_id: null,
        is_deleted: false,
      },
      orderBy: {
        username: 'asc',
      },
    });
/*     
    let ids = result.map(obj => obj.id);
    const invites = await prisma.buddy_requests.findMany({
      where: {
        from_user: req.body.userID,
        to_user: { in: ids }, 
        is_deleted: false,
      },
    });
    console.log(result,ids, invites);
 */
    
    res.send(result);
  }
  catch (error) {
    console.error(error);
    res.send(null);
  }
});

//send buddy request
router.post('/request', async (req, res) => {
  //console.log(req.cookies.token)//user_id for from_user

  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
  
  console.log(userToken);
  console.log(req.body);
  //console.log(req.body.id); // user_id for to_user

  //Ensures that only one active request exists at a time
  const result = await prisma.buddy_requests.upsert({
    where: {
      activeRequest: {
        from_user: userToken.id,
        to_user: req.body.user.id,
        is_deleted: false
      }
    },
    update: {},
    create: {
      from_user: userToken.id,
      to_user: req.body.user.id,
      request_message: req.body.requestMessage,
    }
  });

  res.send(result); // Sending a 200 status code for a successful request
});

/*
SELECT COUNT(*) as num, u2c_others.user_id
FROM interests u2c_main
JOIN interests u2c_others
ON u2c_others.category_id = u2c_main.category_id AND u2c_main.user_id <> u2c_others.user_id
WHERE u2c_main.user_id = 1
GROUP BY u2c_others.user_id;
*/

router.get('/interest', async (req, res) => {
  console.log("Gotit")
  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });

  const result = await prisma.$queryRaw`
  SELECT COUNT(*) as num, u2c_others.user_id as id, users.username, users.buddy_availability, users.buddy_id
  FROM interests u2c_main
  JOIN interests u2c_others
  ON u2c_others.category_id = u2c_main.category_id AND u2c_others.user_id != u2c_main.user_id
	JOIN users ON u2c_others.user_id = users.id
  WHERE u2c_main.user_id = ${userToken.id} AND buddy_id IS NULL AND buddy_availability = TRUE
  GROUP BY u2c_others.user_id, users.username, users.buddy_availability, users.buddy_id
  ORDER BY num DESC
  LIMIT 4;
`;

  console.log('THe UPdated QUery!', result)

  const r2 = await Promise.all(result.map(async (u) => {
    const interest = await prisma.$queryRaw`
        SELECT categories.name AS name
        FROM categories JOIN interests
        ON categories.id = interests.category_id
        WHERE interests.user_id = ${u.user_id}
      `;
    u['test'] = 'this is a test';
    return { ...u, interest, num: null };
  }));

  console.log('ReSuLt', r2);
  return res.send(r2);


})
export default router;

