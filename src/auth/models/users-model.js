require('dotenv').config();
const schema=require('./user-schema.js');
const Model=require('./mongo.js');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const SECRET=process.env.CLIENT_SECRET || 'mysecret';
const roles={
  user:['read'],
  editor:['read','create','update'],
  admin:['read','create','update','delete'],
};
class Users extends Model{
  constructor(){
    super(schema);
  }
  async save(record){
    const result=await this.get({username:record.username});
    if(result.length===0){
      record.password=await bcryptjs.hash(record.password,5);
      const user=await this.create(record);
      return user;
    }
  }
  async authenticationBasic(user,pass){
    const result=await this.get({username: user});
    const valid=await bcryptjs.compare(pass,result[0].password);
    return valid ? result:Promise.reject('Wrong Password');
  }
  generateToken(user){
    const userData={username:user.username,role:user.role};
    const token=jwt.sign(userData,SECRET);
    return token;
  }
  async authenticateToken(token){
    try{
      const tokenObject=await jwt.verify(token,SECRET);
      const result=await this.get({username:tokenObject.username});
      if(result.length!=0){
        return Promise.resolve(result[0]);

      }else{
        return Promise.reject('User is not found');
      }
    }catch(e){return Promise.reject(e.message);}
  }

}
module.exports=new Users();