import mongoose from "mongoose";

export interface BlogInfo {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    tag: string[];
    description: string;
    createAt: Date;
    updateAt: Date;
}
