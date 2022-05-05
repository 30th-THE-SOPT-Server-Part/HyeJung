import mongoose from "mongoose";

export interface BlogCreateDto {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    tag?: string[];
    description?: string;
    createAt?: Date;
    updateAt?: Date;
}
