import Catalog from "../models/Catalog.js";
import { removeImage, uploadImage } from "../utils/file.js";

export default {
    create: async (data) => {
        const { name, image, desc } = data;
        if (!name || !image || !desc) throw new Error("Name and image are required");

        const catalog = new Catalog({
            name,
            desc
        });

        const filePath = await uploadImage(image, 'catalogs', catalog._id);

        catalog.image = filePath;
        await catalog.save();
        return catalog;
    },
    list: async () => {
        const catalogs = await Catalog.find({}).select("-__v");
        return catalogs;
    },
    edit: async (id, data) => {
        const { name, image, desc } = data;
        if (!name || !desc) throw new Error("Name is required");

        const catalog = await Catalog.findById(id);
        if (!catalog) throw new Error("Catalog not found");

        catalog.name = name;
        catalog.desc = desc;
        if (image) {
            await removeImage(catalog.image);
            const filePath = await uploadImage(image, 'catalogs', catalog._id);
            catalog.image = filePath;
        }

        await catalog.save();
        return catalog;
    },
    delete: async (id) => {
        const catalog = await Catalog.findById(id);
        if (!catalog) throw new Error("Catalog not found");

        removeImage(catalog.image);
        await catalog.deleteOne();
        return catalog;
    }
}