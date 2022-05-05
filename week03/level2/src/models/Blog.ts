import mongoose from "mongoose";
import User from "./User";
import { BlogInfo } from "../interface/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User
    },
    title: {
        type: String,
        required: true
    },
    tag: {
        type: Array
    },
    description: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);
