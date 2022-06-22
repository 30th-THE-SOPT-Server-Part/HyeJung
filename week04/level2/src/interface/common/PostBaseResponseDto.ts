// 모든 서비스 단에서 공통적으로 사용되는 response dto
import mongoose from "mongoose"

export interface PostBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId
}