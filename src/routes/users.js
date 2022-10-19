import { Router } from "express";
import UserController from "../controller/UserController.js";
import checkAuth from '../middleware/checkAuth.js'
import checkRole from '../middleware/checkRole.js'

let router = Router();

router.get("/",checkAuth, checkRole('user'), UserController.home);

export default router;
