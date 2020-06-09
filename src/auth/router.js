const express=require('express');
const users=require('./models/users-model.js');
const basicAuth=require('./middleware/basic.js');
const router=express.Router();

router.post('/signup',saveHandler);
router.post('/signin',basicAuth,signHandler);
router.get('/users',listHandler);
async function saveHandler(req,res) {
  try{
    const user=await users.save(req.body);
    console.log(user);
    const token=users.generateToken(user);
    res.json({token});
  } catch(err){
    res.status(403).send('user already exists');
  }
}
function signHandler(req,res) {
  console.log('token',req.token,'user',req.user);
  res.json({token:req.token,user:req.user});
}
async function listHandler(req,res){
  const allUsers=await users.get({});
  res.json({users:allUsers});
}
module.exports=router;