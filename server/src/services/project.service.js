import Project from "../models/Project.js";
import { removeImage, uploadImage } from "../utils/file.js";

export default {
    create: async (data, image, images) => {
        const { name, desc, url, github, catalogs, techStack, status } = data;

        if (!name || !desc || !image || !images?.[1] || !status || !catalogs?.[0]) throw new Error("Missing required fields");

        const project = new Project({
            name,
            desc,
            url,
            github,
            catalogs,
            techStack,
            status,
        });
        project.image = await uploadImage(image, 'projects', project._id);
        project.images = await Promise.all(images.map((img, i) => uploadImage(img, 'projects', `${i}_${project._id}`)));

        await project.save();
        await project.populate("catalogs");

        return {
            ...project.toObject(),
        };
    },
    updateInfo: async (id, data, image) => {
        const { name, desc, url, github, catalogs, techStack, status } = data;

        if (!name || !desc || !status || !catalogs?.[0]) throw new Error("Missing required fields");

        const project = await Project.findById(id);
        if (!project) throw new Error("Project not found");

        project.name = name;
        project.desc = desc;
        project.url = url;
        project.github = github;
        project.catalogs = catalogs;
        project.techStack = techStack;
        project.status = status;

        if (image) {
            await removeImage(project.image);
            project.image = await uploadImage(image, 'projects', id);
        }

        await project.save();
        await project.populate("catalogs");

        return {
            ...project.toObject(),
        };
    },
    updateImage: async (id, index, image) => {
        const project = await Project.findById(id);

        if (!project) throw new Error("Project not found");

        if (!image) throw new Error("Missing required fields");

        await removeImage(project.images[index]);
        project.images[index] = await uploadImage(image, 'projects', `${index}_${id}`);
        await project.save();

        return {
            _id: project._id,
            images: project.images,
        }
    },
    list: async () => {
        const projects = await Project.find({}).sort({ created: -1 }).populate("catalogs");
        return projects.map(project => ({
            ...project.toObject(),
        }));
    },
    delete: async (id) => {
        const project = await Project.findById(id);
        if (!project) throw new Error("Project not found");

        await Promise.all([
            removeImage(project.image),
            ...project.images.map(img => removeImage(img)),
            project.remove(),
        ]);

        return {
            _id: project._id,
        };
    },
}
