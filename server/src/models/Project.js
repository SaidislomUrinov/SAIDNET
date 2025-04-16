import { model, Schema } from "mongoose";
import { getNow } from "../utils/time.js";

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
    images: {
        type: [String],
        default: [],
    },
    desc: {
        type: String,
        required: true,
    },
    url: String,
    github: String,
    catalogs: {
        type: [Schema.Types.ObjectId],
        ref: 'Catalog',
    },
    techStack: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'archived'],
        default: 'active',
    },
    created: {
        type: Number,
        default: getNow
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
export default model('Project', schema);