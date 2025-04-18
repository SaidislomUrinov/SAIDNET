import { Router } from "express";
import orderController from "../controllers/order.controller.js";


const router = Router();

router.post('/create', orderController.create);

export default router;