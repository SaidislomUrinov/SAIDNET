import mongoose from "mongoose";
import envConfig from "./env.config.js";

mongoose.connect(envConfig.MONGO_URI).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
})