import express from 'express'
import  Jwt  from 'jsonwebtoken'

const checkauth=(req,res,next)=>{
    
    try{
const token= req.headers.authorization.split(" ")[1]
// console.log(token)
const verify = Jwt.verify(token,'i am markand')

// if(verify.userType== 'admin')
// {
//     next()
// }
// else
// {
//     return res.status(401).json({

//         msg: 'only access admin'
//     })
// }
next()

    }
    catch(error)
    {
        return res.status(401).json({
            msg:'invalid token please try again'
        })
    }
} 
export default checkauth;