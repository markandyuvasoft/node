import express from 'express'
import db from '../db/conn.js';
import mongoose from 'mongoose'

const { Schema, model,Types}= mongoose

const ChildSchema= new Schema({

    name: String,
    age: Number
    })
    
const Child = model("Child",ChildSchema)

export default Child;