import express from 'express'
import * as url from 'url'
import db from '../db/conn.js'
import Student from '../models/students.js'
import checkAuth from '../middleware/check-auth.js'

const studentrouter=express.Router()

//....................................GET METHOD STUDENT START.............................................................................................
studentrouter.get("/students",checkAuth,async(req,res)=>{

    try{
        const get= await Student.find()
        res.send(get)

        }catch(err){
         res.send(err)
        }
})
// ....................................GET METHOD STUDENT END.............................................................................................


// ...............................GET METHOD WITH ID START.............................................................................................
studentrouter.get("/student/:id",checkAuth,async(req,res)=>{

    try{

        const _id= req.params.id
        const getid= await Student.findById(_id)
        res.send(getid)
       
    }catch(err){
        res.send(err)
       }
})
// ..............................GET METHOD WITH ID END........................................................................................


// ..............................POST METHOD START...........................................................................................................
studentrouter.post("/student",checkAuth,(req,res)=>{

   // console.log(req.body);
    const user = new Student(req.body)
    
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
// ..............................POST METHOD END..........................................................................................................


// ..............................UPDATE METHOD USING PUT START.............................................................................................
//update and check mongodb(refresh)
studentrouter.put("/student/:id", checkAuth,async (req,res)=>{

    try{
    
        const _id= req.params.id;
        const update= await Student.findByIdAndUpdate(_id, req.body)
        res.send(update)
    
    }catch(err){
    res.status(400).send(err)
    }
    })
//..............................UPDATE METHOD USING PUT END.....................................................................................


//.............................DELETE METHOD USING START.....................................................................
    studentrouter.delete("/student/:id",checkAuth,async (req,res)=>{

        try{
            const _id=req.params.id;
            const remove = await Student.findOneAndRemove(_id,req.body)
            res.send(remove)

        }catch(err){
            res.status(400).send(err)
        }
    })
//.............................DELETE METHOD  END............................................................................




//.............................SEARCH ROUTE START USING REGEX.................................................................................
studentrouter.get("/search/:Key",checkAuth,async(req,res)=>{

let data= await Student.find(
    {

        "$or":[

            {"name":{$regex:req.params.Key}}
        ]
    }
)
res.send(data)
})
//.............................SEARCH ROUTE END USING REGEX.................................................................................

export default studentrouter;

