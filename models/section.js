import mongoose from "mongoose";

const section = mongoose.Schema({
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page"
    },
    content: Object,
    lang:String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Section = mongoose.model('Section', section);

export default Section;