import mongoose from "mongoose";
import Dining from "../models/dining.js";

export const getDinings = async (req,res) =>{


    try {
        const dinings = await Dining.find({lang: req.query.lang || 'en'});
    
        res.status(200).json(dinings);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findDining = async (req,res) =>{
    let slug = req.params.id;

    try {
        const dinings = await Dining.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(dinings);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createDining = async (req,res) =>{

    let dining = req.body;
    dining.lang = req.query.lang;

    try {
        const dining1 = await Dining.findOneAndUpdate({lang: dining.lang, slug: dining.slug},dining, { new: true,upsert: true});
        
        res.status(200).json(dining1);
        //     , function(err, doc) {
        //     if (err) return res.send(500, {error: err});
        //     return res.send('Succesfully saved.');
        // });
        
    } catch (error) {
        res.status(200).json(error);
    }
        
    // });
}

export const deleteDining = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Dining.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
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