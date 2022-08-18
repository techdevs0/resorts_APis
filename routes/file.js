import express from "express";
import multer from "multer";
import { createFiles, deleteFile, getFiles } from "../controllers/file.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  });

const upload = multer({ storage: storage })

const fileRouter = express.Router();

fileRouter.get('/', getFiles)

fileRouter.post("/", upload.array("image"), createFiles);
fileRouter.delete("/:id", deleteFile);

//single file 
// app.post("/uploadFile", upload.single("image"), (req, res) => {
//     // Stuff to be added later
//     console.log(req.file.filename);

//     if(!req.file){
//         res.status(500).json("error")
//     } else {
//         res.status(200).json("uploaded")
//     }
//   });


export default fileRouter;