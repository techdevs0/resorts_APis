import mongoose from "mongoose";
import Section from "../models/section.js";

export const getSections = (id,lang) => {
    // let s = req.param.lang;
    // let sa = req.param.id;
    // return id;

    
}

export const findSection = async (req,res) =>{
    let slug = req.params.id;

    try {
        const sections = await Section.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(sections);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createSection = async (req,res) =>{

    let section = {};
    let content = req.body;
    section.content = {...content}
    section.page = content.page_id 
    section.lang = req.query.lang;

    try {
        const section1 = await Section.findOneAndUpdate({lang: section.lang, page: section.page},section, { new: true,upsert: true});
        
        res.status(200).json(section1);
        
    } catch (error) {
        res.status(200).json(error);
    }
        
    // });
}

export const deleteSection = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Section.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
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