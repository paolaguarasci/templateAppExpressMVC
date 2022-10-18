import { Router } from "express";
import UserController from "../controller/UserController.js";

let router = Router();

router.get("/", UserController.home);

export default router;
