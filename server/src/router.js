import { Router } from "express";
import adminRoutes from "./routes/admin.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import projectRoutes from "./routes/project.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";

const router = Router();

router.use('/admin', adminRoutes)
router.use('/catalog', catalogRoutes)
router.use('/project', projectRoutes)
router.use('/order', orderRoutes)
router.use('/user', userRoutes)

export default router;