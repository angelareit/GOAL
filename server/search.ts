const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', (req, res) => {
  res.send('This is the search route!')
})

  //search for buddy
router.post('/', async (req, res) =>{
  console.log(req.body)

  try{
    const result = await prisma.users.findFirst({
      where: { username: req.body.searchValue },
    });
    console.log(result)
    if (result === null){
      res.send(null)
    } else {
    if(result.buddy_availability && !result.buddy_id && !result.is_deleted){
      res.send(result)
    } else {
      res.send(null)
    }}
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

//send buddy request
router.post('/request', async (req,res)=> {
  console.log(req.cookies.token)//user_id for from_user
  //console.log(req.body.id); // user_id for to_user
  const result = await prisma.buddy_requests.create({
    data:{
      from_user:12,
      to_user:1,
      request_message:"You have a buddy request."
    }
  })
  res.sendStatus(200); // Sending a 200 status code for a successful request
})

router.post('/availability', async (req, res)=>{

}
)
module.exports = router
