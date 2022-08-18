import mongoose from "mongoose";

const offerSchema = mongoose.Schema({
    post_name: String,
    post_content: String,
    short_description: String,
    is_premium: Number,
    thumbnail: String,
    banner_img: String,
    banner_text: String,
    alt_text: String,
    meta_title: String,
    meta_description: String,
    schema_markup: String,
    post_url: String,
    slug: String,
    route: String,
    is_followed: Boolean,
    is_indexed: Boolean,
    is_indexed_or_is_followed: String,
    img_directory: String,
    images_list: String,
    category_id: Number,
    lang: String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;