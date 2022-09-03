import express from 'express'
import mongoose from 'mongoose'
import db from '../db/conn.js'



const { Schema, model,Types}= mongoose

const ParentSchema= new Schema({

    name: String,
    age: Number
    })    
const Parent = model("Parent",ParentSchema)
    

export default Parent;