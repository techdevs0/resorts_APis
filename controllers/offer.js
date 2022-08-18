import mongoose from "mongoose";
import Offer from "../models/offer.js";

export const getOffers = async (req,res) =>{


    try {
        const offers = await Offer.find({lang: req.query.lang || 'en'});
    
        res.status(200).json(offers);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findOffer = async (req,res) =>{
    let slug = req.params.id;

    try {
        const offers = await Offer.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(offers);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createOffer = async (req,res) =>{

    let offer = req.body;
    offer.lang = req.query.lang;

    try {
        const offer1 = await Offer.findOneAndUpdate({lang: offer.lang, slug: offer.slug},offer, { new: true,upsert: true});
        
        res.status(200).json(offer1);
        //     , function(err, doc) {
        //     if (err) return res.send(500, {error: err});
        //     return res.send('Succesfully saved.');
        // });
        
    } catch (error) {
        res.status(200).json(error);
    }
        
    // });
}

export const deleteOffer = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Offer.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
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