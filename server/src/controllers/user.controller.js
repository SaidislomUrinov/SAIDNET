import catalogService from "../services/catalog.service.js";
import projectService from "../services/project.service.js";

export default {
    home: async (req, res) => {
        try {
            const projects = await projectService.list();
            const catalogs = await catalogService.list();
            return res.send({
                ok: true,
                data: {
                    projects,
                    catalogs
                }
            })
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message
            })
        }
    }
}