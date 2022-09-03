import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId, 
    username:String,
    password:String,
    phone:Number,
    email:String,
    userType:String
})

const User = mongoose.model('User',userSchema)

export default User;