import { model, Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import { comparePass } from "../utils/hash.js";
import envConfig from "../configs/env.config.js";
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    access: {
        type: String,
    },
});

schema.methods.checkPassword = async function (password) {
    return await comparePass(password, this.password);
};

schema.methods.signIn = async function name() {
    const access = jwt.sign({ _id: this._id }, envConfig.JWT_ACCESS, { expiresIn: '1d' });
    this.access = access;
    await this.save();
    return access;
}
export default model('Admin', schema)