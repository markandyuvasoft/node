import mongoose from 'mongoose';
const Schema=mongoose.Schema

const pageSchema = new Schema({
 
name:{
    type:String
   },

page:{
    type: Number
},

gender:{
    type: String
   },

city:{
    type: String
   }
},
);

const Page = new mongoose.model("Page",pageSchema)

export default Page;