import mongoose from "mongoose";
import Page from "../models/page.js";

export const getPages = async (req,res) =>{


    try {
        const pages = await Page.find();
    
        res.status(200).json(pages);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findPage = async (req,res) =>{
    let slug = req.params.id;

    try {
        const pages = await Page.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(pages);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createPage = async (req,res) =>{

    let page = req.body;

    try {
        const page1 = await Page.findOneAndUpdate({slug: page.slug},page, { new: true,upsert: true});
        
        res.status(200).json(page1);
        
    } catch (error) {
        res.status(200).json(error);
    }
}

export const deletePage = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Page.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(400).json(err)
        }
        else{
            res.status(200).json(docs)
        }
    });
}