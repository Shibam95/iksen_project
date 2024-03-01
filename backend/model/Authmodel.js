const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const LogRegSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required:true
  },
  role:{
    type: String,
    enum: ["user","admin"],
    default: "user",
  },
 
  
},{
 timestamps:true,
 versionKey:false
})

module.exports=new mongoose.model('loginregistration',LogRegSchema)