import mongoose from "mongoose";
import { ReviewInfo } from "../interface/review/ReviewInfo";

const ReviewSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User" //user collection의 id를 참조하겠다.
    },
    movie: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Movie"//movie collection의 id를 참조하겠다.
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});

//이 컬렉션의 이름은 Review이고ㅗ, ReviewSchema를 이용해서 만들겠다. 
//? model? 뭐임
export default mongoose.model<ReviewInfo & mongoose.Document>("Review", ReviewSchema);
