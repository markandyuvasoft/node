import express from 'express'
import db from '../db/conn.js';
import Parent from './parent.js';
import Child from './child.js';

import mongoose from 'mongoose'

const { Schema, model,Types}= mongoose
const objectID= Types.ObjectId

const pcSchema= new Schema({

    parent: {type:objectID, ref:Parent},
    child: {type:objectID, ref:Child}
    })
    
    const PCRel= model("PCRel",pcSchema)

export default PCRel;