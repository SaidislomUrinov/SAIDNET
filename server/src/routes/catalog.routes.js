import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middleware.js";
import catalogController from "../controllers/catalog.controller.js";

const router = Router();

router.post('/create', adminMiddleware, catalogController.create);
router.get('/list', catalogController.list);
router.put('/edit', adminMiddleware, catalogController.edit);
router.delete('/delete', adminMiddleware, catalogController.delete);

export default router;