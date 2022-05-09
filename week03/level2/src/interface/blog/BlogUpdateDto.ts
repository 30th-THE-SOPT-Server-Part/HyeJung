import mongoose from "mongoose";

export interface BlogUpdateDto {
    userId: mongoose.Schema.Types.ObjectId;
    title?: string;
    tag?: string[];
    description?: string;
    updateAt: Date;
}
