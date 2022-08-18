import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    alt_text: String,
    banner_img: String,
    banner_imgPreview: String,
    banner_text: String,
    images_list: String,
    inner_route: String,
    is_followed: Boolean,
    is_indexed: Boolean,
    is_indexed_or_is_followed: String,
    meta_description: String,
    meta_title: String,
    post_content: String,
    post_name: String,
    post_url: String,
    route: String,
    schema_markup: String,
    short_description: String,
    slug: String,
    thumbnail: String,
    lang: String,
    thumbnailPreview: String,
    room_type: Number,
    parent_id:Number,
    // tags: [String],
    // selectedFile: String,
    // likeCount: {
    //     type: Number,
    //     default:0
    // },
    // createdAt: {
    //     type : Date,
    //     default: new Date()
    // }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;