const { Schema } = require("mongoose");

const schema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
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