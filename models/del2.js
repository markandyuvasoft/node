import mongoose from 'mongoose';
const Schema=mongoose.Schema

const user1Schema = new Schema({
 
contact_name:{
   type:String
   },

age:{
   type:Number
   },

citizenship:{
   type:String
   },
},
);

const User1 = new mongoose.model("User1",user1Schema)

export default User1;


