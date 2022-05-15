import mongoose from "mongoose";
import { UserCreateDto } from "./UserCreateDto";

// UserCreateDto 랑 똑같은 필드지만 이름은 UserResponseDto 
export interface UserResponseDto extends UserCreateDto {
    //UserResponseDto 만의 필드 추가 가능
    _id: mongoose.Schema.Types.ObjectId
}