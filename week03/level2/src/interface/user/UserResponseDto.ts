import mongoose from "mongoose";
import { UserCreateDto } from "../user/UserCreateDto";

export interface UserResponseDto extends UserCreateDto {
    _id: mongoose.Schema.Types.ObjectId;
};
