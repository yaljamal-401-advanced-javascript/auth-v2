const mongoose=require('mongoose');
const user=mongoose.Schema({
  username:{type:String,require:true},
  password:{type:String,require:true},
  role:{type:String,require:true},
});
module.exports=mongoose.model('user',user);