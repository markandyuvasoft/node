import express from 'express'
import Verify from '../models/verify.js'

const matchrouter=express.Router()

//...................................GET METHOD START.............................................................................................
matchrouter.get("/users",async(req,res)=>{

   try{
       const get= await Verify.find()
       res.send(get)
      
       }catch(err){
        res.send(err)
       }
})
//............................... GET METHOD END.................................................................................................



//...........POST METHOD START...........................................................................................................

matchrouter.post("/user",(req,res,next)=>{

//   console.log(req.body);
  const user = new Verify(req.body)

  user.save().then(()=>{
      res.status(201).send(user)
  }).catch((err)=>{

      res.status(400).send(err)
  }) 
})
//..........POST METHOD END..........................................................................................................


// PIPE LINE AGGREGATION START DESIGNATION ACCORDING NAME.................................................................................
matchrouter.get("/pipe",(req,res,next)=>{

    Verify.aggregate([

     {$match : {designation: 'node developer'}},  // ONE DETAILS FIND

    //{$match: { $and: [{designation: 'node developer'},{age: 29}]}}, // TWO OR MORE DETAILS FIND

    {$sort : {name: 1}},

    {$project : { _id : 0, name : 1, phone: 1}},      //name with phone SHOW

    // {$project : { _id : 0, name : 1, email : 1}},   //name with email SHOW
   
    {$limit : 10}   // SET TO LIMIT 
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
// PIPE LINE AGGREGATION END.................................................................................



//.................... PIPE LINE AGGREGATION START DEPARTMENT ACCORDING SALARY.................................................................................
matchrouter.get("/max",(req,res,next)=>{

    Verify.aggregate([
    
        {$group:
            {
                _id: { department: "$department" },
                totalUser: { $sum: 1 },
                averagesalary: { $max: "$salary" },
               //  _id: { name: "$name"}     //NAME FINDOUT
            }
        },  
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
//..................PIPE LINE AGGREGATION END DEPARTMENT ACCORDING SALARY.................................................................................

 export default matchrouter

