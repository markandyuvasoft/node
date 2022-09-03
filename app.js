import express from 'express'
import * as path from 'path'
import bodyParser from 'body-parser'
import db from './db/conn.js'
import studentrouter from './routes/student.js'
import userrouter from './routes/user.js'
import libraryrouter from './routes/library.js'
import custodyrouter from './routes/custody.js'
import matchrouter from './routes/match.js'
import lookrouter from './routes/look.js'
import pagirouter from './routes/pagi.js'
import filerouter from './routes/file.js'
import morgan from 'morgan'



const app=express()

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(morgan('dev'))     //use to be aggrigation

app.use("/",studentrouter)
app.use("/",userrouter)
app.use("/",libraryrouter)
app.use("/",custodyrouter)
app.use("/",matchrouter)
app.use("/",lookrouter)
app.use("/",pagirouter)
app.use("/",filerouter)


app.listen(3000)

console.log("http://localhost:3000")