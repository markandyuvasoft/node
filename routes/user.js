import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import User from '../models/user.js'


const userrouter=express.Router()


//....................................POST METHOD REGISTER START.............................................................................................
userrouter.post("/register",(req,res,next)=>{
bcrypt.hash(req.body.password,10,(err,hash)=>{

    if(err)
    {
        return res.status(500).json({
            error:err
        })
    }
    else
    {
        const user= new User({
             _id: new mongoose.Types.ObjectId,
             username: req.body.username,
             password:hash,
             phone:req.body.phone,
             email:req.body.email,
             userType:req.body.userType
        })
        user.save()
        .then(result=>{
            res.status(200).json({
                new_user:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }
})

})
//....................................POST METHOD REGISTER END.............................................................................................


//...................POST METHOD LOGIN START................................................................................................................
userrouter.post('/login',(req,res,next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(user=>{

        if(user.length < 1)
        {
            return res.status(401).json({
                msg: 'user not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

            if(!result)
            {
           return res.status(401).json({
                    msg: 'not match'
                })
            }
            if(result)
            {
                const token = Jwt.sign({

                    username:user[0].username,
                    email:user[0].email,
                    phone:user[0].phone
                },
                'i am markand',
                {
                    expiresIn:"24h"
                }
                )
                res.status(200).json({
                   
                    // username:user[0].username,
                    // email:user[0].email,
                    // phone:user[0].phone,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})
//.................POST METHOD LOGIN END................................................................................................................ 

export default userrouter;