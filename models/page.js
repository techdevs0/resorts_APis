import mongoose from "mongoose";

const pageSchema = mongoose.Schema({
    name: String,
    slug:String,
    content: String,
    short_description: String,
    category_id: Number,
    thumbnail:String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Page = mongoose.model('Page', pageSchema);

export default Page;