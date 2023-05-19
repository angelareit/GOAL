const express2 = require('express')
const router2 = express2.Router()
const { PrismaClient:PrismaClient2 } = require('@prisma/client');
const prisma2 = new PrismaClient2();
const jwt2 = require('jsonwebtoken');


router2.get('/incoming', async (req, res) => {
  // res.send('This is the request route!')
  const userToken = await jwt2.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  })
  
  try{
    const result = await prisma2.buddy_requests.findMany({
      where:{to_user:userToken.id,
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

  const userToken = await jwt2.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  })

  console.log('REquest',req.body.r_id)
  try{
    //set buddy request to deleted
    const result = await prisma2.buddy_requests.update({
      where:{
        id:req.body.r_id
      },
      data:{
            is_deleted:true
      }
    })

    //add buddy to the database
    const result2 = await prisma2.users.update({
      where:{
        id:userToken.id
      },
      data:{
            buddy_id:req.body.b_id
      }
    })
    res.send({result, result2})
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})


router2.post('/incoming/reject', async (req, res)=>{
  const r_id = parseInt(req.body.r_id)
  console.log('REquest',req.body.r_id)
  try{
    const result = await prisma2.buddy_requests.update({
      where:{
        id:r_id
      },
      data:{
            is_deleted:true
      }
    })
    res.send({result})
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

module.exports = router2
