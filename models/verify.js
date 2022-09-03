import mongoose from 'mongoose';
const Schema=mongoose.Schema

const verifySchema = new Schema({
 
name:{
   type:String
   },

designation: {
   type: String
  },
salary:{

   type: Number
   },

department:{

   type: String
   },
},

{timestamps:true});

const Verify = new mongoose.model("Verify",verifySchema)

export default Verify;