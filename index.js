import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import router from "./routes/posts.js";
import File from "./models/file.js";
import User from "./models/user.js";
import fileRouter from "./routes/file.js";
import roomRouter from "./routes/rooms.js";
import diningRouter from "./routes/dining.js";
import weddingRouter from "./routes/wedding.js";
import offerRouter from "./routes/offer.js";
import blogRouter from "./routes/blog.js";
import pageRouter from "./routes/page.js";
import faqRouter from "./routes/faq.js";
import Jwt  from "jsonwebtoken";
import auth from "./middleware/auth.js";
import bcrypt from "bcryptjs"
import { createSection, getSections } from "./controllers/section.js";
import Section from "./models/section.js";

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
// app.use('/rooms', auth, roomRouter)
app.use('/rooms', roomRouter)
app.use('/dinings', diningRouter)
app.use('/weddings', weddingRouter)
app.use('/offers', offerRouter)
app.use('/blogs', blogRouter)
app.use('/pages', pageRouter)
app.use('/faqs', faqRouter)
app.post('/add-section', createSection)
app.get('/all-sections/:id/:lang', async ( req, res ) => {
    try {
        const sections = await Section.find({lang: req.params.lang || 'en', page: req.params.id});
    
        res.status(200).json([sections[0].content]);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
})

app.get('/sections', async ( req, res ) => {
    try {
        const sections = await Section.find().populate('page',"-_id -__v").select("-__v");
    
        res.status(200).json(sections);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
})

app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = Jwt.sign(
          { user_id: user._id, email },
            'process.env.TOKEN_KEY',
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here    
});

app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = Jwt.sign(
            { user_id: user._id, email },
            'process.env.TOKEN_KEY',
            {
                expiresIn: "2h",
            }
            );
    
            // save user token
            user.token = token;
    
            // user
            res.status(200).json(user);
            console
        } else {
            res.status(400).send("Invalid Credentials");
        }

        
        } catch (err) {
        console.log(err);
        }
});


const CONNECTION_URL = 'mongodb+srv://root:729711807352a@cluster0.s9eigte.mongodb.net/resorts?retryWrites=true&w=majority';
const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser:true})
.then(() => app.listen(port, () => console.log("successful running on port => "+port)))
.catch((error) => console.log("error",error.message ));

// mongoose.set('useFindAndModify', false)