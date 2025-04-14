import jwt from "jsonwebtoken";
import envConfig from "../configs/env.config.js";
import Admin from "../models/Admin.js";

export default async function (req, res, next) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) throw new Error("No token provided");

        const decoded = jwt.verify(token, envConfig.JWT_ACCESS);

        if (!decoded) throw new Error("Invalid token");

        const admin = await Admin.findById(decoded._id);

        if (!admin) throw new Error("Admin not found");

        if (admin.access !== token) throw new Error("Token expired");

        req.admin = admin;

        next();
    } catch (error) {
        return res.status(401).send({
            ok: false,
            msg: error.message,
        });
    }
}