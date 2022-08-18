import mongoose from "mongoose";

const diningSchema = mongoose.Schema({
    post_name: String,
    post_content: String,
    short_description: String,
    room_type: Number,
    parent_id: Number,
    thumbnail: String,
    banner_img: String,
    banner_text: String,
    alt_text: String,
    meta_title: String,
    meta_description: String,
    schema_markup: String,
    post_url: String,
    route: String,
    inner_route: String,
    is_followed: Boolean,
    is_indexed: Boolean,
    is_indexed_or_is_followed: String,
    images_list: String,
    section_slug: String,
    section_name: String,
    section_dress_code: String,
    section_opening_hours: String,
    slug: String,
    lang: String,
    // tags: [String],
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Dining = mongoose.model('Dining', diningSchema);

export default Dining;