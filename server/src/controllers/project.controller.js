import projectService from "../services/project.service.js";

export default {
    create: async (req, res) => {
        try {
            const image = req?.files?.image;
            const images = req?.files?.images;
            const data = req.body;

            const result = await projectService.create(data, image, images);
            return res.send({
                ok: true,
                msg: "Project created successfully",
                data: result,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    list: async (_, res) => {
        try {
            const list = await projectService.list();
            return res.send({
                ok: true,
                msg: "Projects listed successfully",
                data: list,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    updateInfo: async (req, res) => {
        try {
            const image = req?.files?.image;
            const data = req.body;

            const result = await projectService.updateInfo(data._id, data, image);
            return res.send({
                ok: true,
                msg: "Project updated successfully",
                data: result,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    updateImage: async (req, res) => {
        try {
            const image = req?.files?.image;
            const { id, index } = req.body;

            const result = await projectService.updateImage(id, index, image);
            return res.send({
                ok: true,
                msg: "Project image updated successfully",
                data: result,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    deleteImage: async (req, res) => {
        try {
            const { id, index } = req.query;

            const result = await projectService.deleteImage(id, index);
            return res.send({
                ok: true,
                msg: "Project image deleted successfully",
                data: result,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.query;

            const result = await projectService.delete(id);
            return res.send({
                ok: true,
                msg: "Project deleted successfully",
                data: result,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    addImage: async (req, res) => {
        try {
            const image = req?.files?.image;
            const { id } = req.body;

            const result = await projectService.addImage(id, image);
            return res.send({
                ok: true,
                msg: "Project image added successfully",
                data: result,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    }
}