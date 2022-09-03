import mongoose from "mongoose";
import validator from "validator";


const multipleSchema= new mongoose.Schema({

title :{
    type:String,
},

files: [Object]
})

const Multiple= new mongoose.model('multiple',multipleSchema)

export default Multiple