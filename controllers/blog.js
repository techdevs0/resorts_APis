import mongoose from "mongoose";
import Blog from "../models/blog.js";

export const getBlogs = async (req,res) =>{


    try {
        const blogs = await Blog.find({lang: req.query.lang || 'en'});
    
        res.status(200).json(blogs);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const findBlog = async (req,res) =>{
    let slug = req.params.id;

    try {
        const blogs = await Blog.findOne({lang: req.query.lang || 'en', slug : slug });
    
        res.status(200).json(blogs);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createBlog = async (req,res) =>{

    let blog = req.body;
    blog.lang = req.query.lang;

    try {
        const blog1 = await Blog.findOneAndUpdate({lang: blog.lang, slug: blog.slug},blog, { new: true,upsert: true});
        
        res.status(200).json(blog1);
        
    } catch (error) {
        res.status(200).json(error);
    }
}

export const deleteBlog = async (req, res) => {
    let lang = req.query.lang;
    let slug = req.params.id;
    Blog.findOneAndDelete({lang: lang, slug: slug}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(400).json(err)
        }
        else{
            res.status(200).json(docs)
        }
    });
}