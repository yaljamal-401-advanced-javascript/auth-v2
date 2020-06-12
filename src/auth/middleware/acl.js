const users=require('../models/users-model.js');

module.exports=(capability)=>{
  return (req,res,next)=>{
    try{
      if(req.capabilities.includes(capability)){
        next();
      }else{
        next('Access Denied');
      }
    }
    catch(e){
      next('Invalid login');
    }
  };
};
