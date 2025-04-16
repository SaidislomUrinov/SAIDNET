import { Router } from "express";
import adminRoutes from "./routes/admin.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import projectRoutes from "./routes/project.routes.js";

const router = Router();

router.use('/admin', adminRoutes)
router.use('/catalog', catalogRoutes)
router.use('/project', projectRoutes)

export default router;