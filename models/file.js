
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: [true, "Uploaded file must have a name"],
    },
    destination: {
      type: String,
      required: [true, "Uploaded file must have a url"],
    },
  });

const File = mongoose.model('images', fileSchema);

export default File;