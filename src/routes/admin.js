import AdminController from "../controller/AdminController.js";
import { Router } from "express";

let router = Router();

router.get("/", AdminController.home);

export default router;
