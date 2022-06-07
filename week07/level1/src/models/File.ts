import mongoose from "mongoose";
import { FileInfo } from "../interface/file/FileInfo";

const FileSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

export default mongoose.model<FileInfo & mongoose.Document>("File", FileSchema);
