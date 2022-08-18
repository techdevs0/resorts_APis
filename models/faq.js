import mongoose from "mongoose";

const faqSchema = mongoose.Schema({
    question: String,
    answer: String,
    slug: String,
    page: String,
    innerpage: String,
    lang: String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;