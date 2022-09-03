import express from 'express'
import Data from '../models/del1.js'
import User1 from '../models/del2.js'


const lookrouter=express.Router()

// POST THE DEL1 DETAILS START...........................................................................................................
lookrouter.post("/data1",(req,res,next)=>{

    const data = new Data(req.body)

    data.save().then(()=>{
        res.status(201).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    }) 
  })
// POST THE DEL1 DETAILS END....................................................................................................................................
  

// ...........................POST THE DEL2 DETAILS START.......................................................................................................
lookrouter.post("/data2",(req,res,next)=>{

    const user = new User1(req.body)
  
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
  
        res.status(400).send(err)
    }) 
  })
//..........................POST THE DEL2 DETAILS END..........................................................................................................
  


//.........GET THE LOOKUP AGGRIGATION START.....................................................................................................................
lookrouter.get("/max1",(req,res,next)=>{

    User1.aggregate([
        { $lookup:
            {
               from: "datas",
               localField: "contact_name",
               foreignField: "name",
               as: "address"
            }
        }
    ])
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'error occured!'
        })
    })
    })
//.........GET THE LOOKUP AGGRIGATION END.....................................................................................................................
 
 export default lookrouter

