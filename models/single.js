import mongoose from "mongoose";
import validator from "validator";

const singleSchema= new mongoose.Schema({

fileName:{
    type: String,
},
filePath:{
    type: String,
},
fileType:{
    type: String,
},
})

const Single= new mongoose.model('single',singleSchema)

export default Single