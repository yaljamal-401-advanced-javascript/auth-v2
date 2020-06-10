const express=require('express');
const users=require('./models/users-model.js');
const basicAuth=require('./middleware/basic.js');
const oauth=require('./middleware/oauth.js');
const bearer=require('./middleware/bearer.js');
const acl=require('./middleware/acl.js');
const router=express.Router();

router.post('/signup',saveHandler);
router.post('/signin',basicAuth,signHandler);
router.get('/users',listHandler);

router.get('/secret',bearer,(req,res)=>{
  res.json(req.user);
});
router.get('/oauth',oauth,(req,res)=>{
  res.json({token:req.token});
});
router.post('/read',bearer,acl('read'),(req,res)=>{
  res.json('OK');

});
router.post('/create',bearer,acl('create'),(req,res)=>{
  res.json('OK');

});
router.put('/update',bearer,acl('update'),(req,res)=>{
  res.json('ok');

});
router.delete('/delete',bearer,acl('delete'),(req,res)=>{
  res.json('ok');
});
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