const express2 = require('express')
const router2 = express2.Router()
const { PrismaClient:PrismaClient2 } = require('@prisma/client');
const prisma2 = new PrismaClient2();
const jwt2 = require('jsonwebtoken');


router2.get('/incoming', async (req, res) => {
  // res.send('This is the request route!')
  const userToken = await jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  })

  try{
    const result = await prisma2.buddy_requests.findMany({
      where:{to_user:1,
      is_deleted:false},
      orderBy:{
        created_at:'desc'
      },
      include:{
        users_buddy_requests_from_userTousers: true
      }
    
    })
    res.send(result)

  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

router2.post('/incoming/accept', async (req, res)=>{
  return res.status(200).send('incoming/accept')
})


router2.post('/incoming/reject', async (req, res)=>{
  res.status(200).send('incoming/reject')
})

module.exports = router2
