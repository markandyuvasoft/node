import express from 'express'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import * as path from 'path'
import Single from '../models/single.js'
import Multiple from '../models/multiple.js'


const filerouter=express.Router()

//.....................FILE STORAGE QUERY START..................................................................................................
    const storage = multer.diskStorage({
    destination: './upload/images',
  
  filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
//.....................FILE STORAGE QUERY END......................................................................................................


//.......................................FILE FILTER QUERY START....................................................................................
const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
      || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf'){
          cb(null, true);
      }else {
          cb(null, false);
      }
}
const upload= multer({storage:storage, fileFilter:filefilter})
//.......................................FILE FILTER QUERY END...................................................................................


//....................SINGLE FILE UPLOAD ROUTE START.............................................................................................
filerouter.post("/single",upload.single('file'),async(req,res,next)=>{
  try{
    const file = new Single({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
    });

    await file.save();
    res.status(201).send(file);
}catch(error) {
    res.status(400).send(error.message);
}
})
//...................SINGLE FILE UPLOAD ROUTE END...........................................................................................


//...............................MULTIPLE FILE UPLOAD ROUTE START............................................................................
filerouter.post("/multiple",upload.array('files'), async(req,res,next)=>{
try {
let fileArray= []

req.files.forEach(element=>{

  const file={
  fileName: element.originalname,
  filePath: element.path,
  fileType: element.mimetype,
  }
  
  fileArray.push(file)
})
const multiplefile= new Multiple({
  title: req.body.title,
  files: fileArray
})

await multiplefile.save()
  res.status(201).send(multiplefile)
}catch (error) {
  res.status(400).send(error.message)
}
})
//..............................MULTIPLE FILE UPLOAD ROUTE END............................................................................


export default filerouter
