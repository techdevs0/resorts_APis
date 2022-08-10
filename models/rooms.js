import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default:0
    },
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;