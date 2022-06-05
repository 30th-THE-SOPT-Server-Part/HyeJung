import mongoose from "mongoose";
import config from "../config"; 
import Movie from "../models/Movie";
import Review from "../models/Review";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    //몽구스 옵션 설정 (홈페이지에서 필요 시 추가하기)
    mongoose.set('autoCreate', true); //* 자동으로 컬렉션 생성

    console.log("Mongoose Connected ...");

    //create 시 빈 컬렉션으로 생성하겠다.
    Movie.createCollection().then((collection) => {
      console.log("Movie collection is created!! ")
    });

    Review.createCollection().then((collection) => {
      console.log("Review collection is created!! ")
    });

  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
