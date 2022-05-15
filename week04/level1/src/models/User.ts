import mongoose from "mongoose";
import { UserInfo } from "../interface/user/UserInfo"

// user schema 생성하여 컬렉션 만들어
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //null 허용 안함
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //중복값 불가.
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    }
});

// mongoose를 통해 export
// UserInfo를 몽구스 도큐먼트 타입으로 만들어서 User라는 이름으로 내보내겠다.
export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema); 