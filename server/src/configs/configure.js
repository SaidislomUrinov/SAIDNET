import Admin from "../models/Admin.js";
import { hashPass } from "../utils/hash.js";
import envConfig from "./env.config.js";

(async function () {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            const newAdmin = new Admin({
                name: envConfig.ADMIN_NAME,
                username: envConfig.ADMIN_USERNAME,
                password: await hashPass(envConfig.ADMIN_PASSWORD),
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
})()