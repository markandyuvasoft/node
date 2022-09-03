import express from 'express'
import Parent from '../models/parent.js'
import Child from '../models/child.js'
import PCRel from '../models/pc.js'

const custodyrouter=express.Router()

// ..............................POST CHILD START........................................................................................
custodyrouter.post("/child", async(req,res)=>{
    res.json(await Child.create(req.body))
    })
// ..............................POST CHILD END........................................................................................................


// ..................POST PARENT START.................................................................................................................
custodyrouter.post("/parent", async(req,res)=>{
    res.json(await Parent.create(req.body))
    })
// ..................POST PARENT END.....................................................................................................................

  
// ...................................POST CUSTODY START..................................................................................................
custodyrouter.post("/custody/:parent/:child", async(req,res)=>{

    const {parent, child}= req.params
    
    const p= await Parent.findOne({name:parent})
    const c= await Child.findOne({name:child})
    
    res.json(await PCRel.create({parent: p._id, child: c._id}))
    })
// ...................................POST CUSTODY END..................................................................................................
 
    
    
// ....................GET ASSOCIATION START...........................................................................................................
custodyrouter.get("/parents/:child", async (req,res)=>{    
    res.json(await PCRel.find({child: req.params.child}).populate("parent").populate("child"))
    })
// ....................GET ASSOCIATION END...........................................................................................................


export default custodyrouter;