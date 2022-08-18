import mongoose from "mongoose";
import Faq from "../models/faq.js";

export const getFaqs = async (req,res) => {


    try {
        const faqs = await Faq.find({lang: req.query.lang || 'en'});
    
        res.status(200).json(faqs);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findFaq = async (req,res) =>{
    let slug = req.params.id;

    try {
        const faqs = await Faq.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(faqs);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createFaq = async (req,res) =>{

    let faq = req.body;
    faq.lang = req.query.lang;

    try {
        const faq1 = await Faq.findOneAndUpdate({lang: faq.lang, slug: faq.slug},faq, { new: true,upsert: true});
        
        res.status(200).json(faq1);
        //     , function(err, doc) {
        //     if (err) return res.send(500, {error: err});
        //     return res.send('Succesfully saved.');
        // });
        
    } catch (error) {
        res.status(200).json(error);
    }
        
    // });
}

export const deleteFaq = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Faq.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
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