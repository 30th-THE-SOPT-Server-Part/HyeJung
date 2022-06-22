import mongoose from "mongoose";
import { MovieInfo } from "../interface/movie/MovieInfo";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    thumbnail: {
        type: String
    },
    story: {
        type: String
    },
    comments: [{ //코멘트는 배열
        writer: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User" //유저 참조
        },
        comment: {
            type: String,
            required: true
        }
    },
    { //creatAt, updateAt 이 자동으로 기록됨 (코멘트의 timestamp)
        timestamps: true
    }]
},
{ //movie의 timestamp
    timestamps: true
});

export default mongoose.model<MovieInfo & mongoose.Document>("Movie", MovieSchema);
