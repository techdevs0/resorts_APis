import mongoose from "mongoose";
import Wedding from "../models/wedding.js";

export const getWeddings = async (req,res) =>{


    try {
        const weddings = await Wedding.find({lang: req.query.lang || 'en'});
    
        res.status(200).json(weddings);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findWedding = async (req,res) =>{
    let slug = req.params.id;

    try {
        const weddings = await Wedding.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(weddings);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createWedding = async (req,res) =>{

    let wedding = req.body;
    wedding.lang = req.query.lang;

    try {
        const wedding1 = await Wedding.findOneAndUpdate({lang: wedding.lang, slug: wedding.slug},wedding, { new: true,upsert: true});
        
        res.status(200).json(wedding1);
        //     , function(err, doc) {
        //     if (err) return res.send(500, {error: err});
        //     return res.send('Succesfully saved.');
        // });
        
    } catch (error) {
        res.status(200).json(error);
    }
        
    // });
}

export const deleteWedding = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Wedding.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(400).json(err)
        }
        else{
            res.status(200).json(docs)
        }
    });
}

// export const updatePost = async (req, res) => {
//     const { id: _id } = req.params;
//     const post = req.body;

//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

//     const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new : true})

//     res.json(updatePost)
// }