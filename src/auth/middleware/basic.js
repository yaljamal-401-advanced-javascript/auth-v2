const base64=require('base-64');
const users=require('../auth/users.js');
module.exports=(req,res,next) =>{
  if(!req.headers.authorization){
    next('invalid Login');
  }else{
    const basic=req.headers.authorization.split(' ').pop();
    console.log('basic',basic);
    const [user,pass]=base64.decode(basic).split(':');

    users.authenticationBasic(user,pass)
      .then((validUser)=>{
        req.token=users.generateToken(validUser);
        next();
      }).catch((err)=>next(err));
  }
};