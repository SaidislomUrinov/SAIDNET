import { model, Schema } from "mongoose";
import { getNow } from "../utils/time.js";

const schema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: String,
    phone: String,
    telegram: String,
    via: {
        type: String,
        enum: ['telegram', 'phone']
    },
    status: {
        type: String,
        enum: ['active', 'archived', 'recontact', 'proccess', 'success'],
        default: 'active'
    },
    created: {
        type: Number,
        default: getNow
    },
    update: {
        type: Number,
        default: getNow
    }
});

schema.pre('save', async function () {
    if (this.isNew) {
        const id = await model('Order').countDocuments() + 1;
        this.id = id;
    }
    this.update = getNow();
});
export default model('Order', schema);