import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: String,
    long_description: String,
    short_description: String,
    img: String,
    banner_img: String,
    sub_title: String,
    posted_by: String,
    author_img: String,
    author_details: String,
    slug: String,
    lang: String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;