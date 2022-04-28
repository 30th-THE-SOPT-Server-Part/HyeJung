import dotenv from "dotenv";

//NODE ENV Settings
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: parseInt(process.env.PORT as string, 10) as number,
    mongoURI: process.env.MONGODB_URI as string,
};
