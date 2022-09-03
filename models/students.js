import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({

name : {
        type: String,

    },

email:{
        type:String,
        unique:[true, "email id present"],
    },

password:{
        type:String,
        maxlength:10,
        minlength:5,
        trim:true
         },

phone:{

        type:Number,
        min:10,     
    },

address:{
        type: String,
      
    },

userType:{
        type:String

    },

    })


//create a collection
const Student = new mongoose.model('Student',studentSchema)




export default Student;