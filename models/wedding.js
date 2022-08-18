import mongoose from "mongoose";

const weddingSchema = mongoose.Schema({
    name: String,
    short_description: String,
    detailed_content: String,
    slug: String,
    img_directory: String,
    images_list: String,
    thumbnailPreview: String,
    thumbnail: String,
    lang: String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Wedding = mongoose.model('Wedding', weddingSchema);

export default Wedding;