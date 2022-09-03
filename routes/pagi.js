import express from 'express'
import Page from '../models/page.js'

const pagirouter=express.Router()

// .............................GET METHOD  START...............................................................................................
pagirouter.get("/pages",async(req,res)=>{

   try{
       const get= await Page.find()
   
       res.send(get)
      
       }catch(err){
   
        res.send(err)
       }
})
//...........................GET METHOD END........................................................................................................


//............POST METHOD START.....................................................................................................................
pagirouter.post("/page",(req,res,next)=>{

  const user = new Page(req.body)

  user.save().then(()=>{
      res.status(201).send(user)
  }).catch((err)=>{

      res.status(400).send(err)
  }) 
})
//...........POST METHOD END..........................................................................................................................


//.............................. GET PAGINATION START..................................................................................................

pagirouter.get("/pagi",async(req,res,next)=>{

    try{
        const {page=1, limit=15 ,sort,select,search=""}=req.query;

        const data= await Page.find({name:{$regex: search, $options: "i" }})         

            .sort({[sort]:1})        // sorting name, id ,etc

            .limit(limit * 1)       // apply limit to show data

            . skip((page-1) * limit)     // pagination formula

          // .select({name:1})         // show the name 

            res.send({page:page, limit:limit, data:data})

            const total = await Page.countDocuments({
        
               name: { $regex: search, $options: "i" }   // search name according
        
            });
    }catch (error) {

        console.log(error)
        res.status(500).json({

            error:error
        })
    }
})
//............................ GET PAGINATION END..................................................................................................

export default pagirouter

