import AdminController from "../controller/AdminController.js";
import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import checkRole from "../middleware/checkRole.js";
const router = Router();

router.get("/", checkAuth, checkRole("admin"), AdminController.home);

export default router;
