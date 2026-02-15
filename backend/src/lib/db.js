import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL)
        console.log("mongoDB connected", conn.connection.host)
    } catch (error) {
        console.error("error connecting to mongoDB: ", error)
        process.exit(1);
    }
}