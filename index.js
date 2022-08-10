import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import router from "./routes/posts.js";
import File from "./models/file.js";

import fileRouter from "./routes/file.js";
import roomRouter from "./routes/rooms.js";

//   const upload = multer({ dest: 'files/' })
const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.get('/', function (req, res) {
    res.send("hello world");
});

app.use('/uploads',express.static('uploads'))
app.use('/posts', router)
app.use('/files', fileRouter)
app.use('/rooms', roomRouter)

// app.get('/uploadFile', (req, res) => {
//     res.send("eeeeeeeeeeeeeee")
// })

// app.post("/uploadFile", upload.single("image"), (req, res) => {
//     // Stuff to be added later
//     console.log(req.file.filename);

//     if(!req.file){
//         res.status(500).json("error")
//     } else {
//         res.status(200).json("uploaded")
//     }
//   });

//   app.post("/uploadFiles", upload.array("image"), (req, res) => {
//     // Stuff to be added later
//     // console.log(req.files);

//     if(!req.files){
//         res.status(500).json("error")
//     } else {
//         req.files.forEach((file) => {
//             console.log("file is here", file)
//         })
//         res.status(200).json("uploaded")
//     }
//   });

const CONNECTION_URL = 'mongodb+srv://root:729711807352a@cluster0.s9eigte.mongodb.net/resorts?retryWrites=true&w=majority'
// const CONNECTION_URL = 'mongodb://localhost:27017/memories';
const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser:true})
.then(() => app.listen(port, () => console.log("successful running on port"+port)))
.catch((error) => console.log("error",error.message ))

// mongoose.set('useFindAndModify', false)