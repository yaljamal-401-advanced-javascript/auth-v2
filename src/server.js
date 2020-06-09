require('dotenv').config();
const express=require('express');
const router=require('../src/auth/router.js');
const morgan=require('morgan');
const app=express();

const notFound=require('../src/middleware/404.js');
const errorHandler=require('../src/middleware/500.js');

app.use(express.json());
app.use(morgan('dev'));
app.use('/',router);
app.use('*',notFound);
app.use(errorHandler);
module.exports={
  server:app,
  start:(port)=>{
    const PORT =port||process.env.PORT ||3030;
    app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
  },
};