import catalogService from "../services/catalog.service.js";
export default {
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const image = req?.files?.image;

            const catalog = await catalogService.create({ name, image });
            return res.send({
                ok: true,
                msg: "Catalog created successfully",
                data: catalog,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    list: async (req, res) => {
        try {
            const catalogs = await catalogService.list();
            return res.send({
                ok: true,
                data: catalogs,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) throw new Error("Catalog ID is required");

            const { name } = req.body;
            const image = req?.files?.image;

            const catalog = await catalogService.edit(id, { name, image });
            return res.send({
                ok: true,
                msg: "Catalog updated successfully",
                data: catalog,
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

            if (!id) throw new Error("Catalog ID is required");

            const catalog = await catalogService.delete(id);
            return res.send({
                ok: true,
                msg: "Catalog deleted successfully",
                data: catalog,
            });
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message,
            });
        }
    },
}