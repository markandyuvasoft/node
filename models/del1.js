import mongoose from 'mongoose';
const Schema=mongoose.Schema

const dataSchema = new Schema({
 
name:{
   type:String
   },

phone:{
   type:Number
   },

city:{
   type:String
   }
},
);

const Data = new mongoose.model("Datas",dataSchema)

export default Data;