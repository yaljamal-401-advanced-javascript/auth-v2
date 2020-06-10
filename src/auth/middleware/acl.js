module.exports=(capability)=>{
  return (req,res,next)=>{
    try{
      if(req.user.role.includes(capability)){
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
