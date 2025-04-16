import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middleware.js";
import projectController from "../controllers/project.controller.js";
const router = Router();

router.post('/create', adminMiddleware, projectController.create);
router.get('/list', projectController.list);
router.put('/update/info', adminMiddleware, projectController.updateInfo);
router.put('/update/image', adminMiddleware, projectController.updateImage);
router.delete('/update/image', adminMiddleware, projectController.delete);

export default router;