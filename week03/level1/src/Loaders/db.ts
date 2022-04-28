import mongoose from "mongoose";
import config from "../config"; 

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    //몽구스 옵션 설정 (홈페이지에서 필요 시 추가하기)
    mongoose.set('autoCreate', true); //* 자동으로 컬렉션 생성

    console.log("Mongoose Connected ...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
