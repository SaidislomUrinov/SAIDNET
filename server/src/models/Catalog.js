import { model, Schema } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: String,
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    }
});

schema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

export default model('Catalog', schema);