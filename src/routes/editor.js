import EditorController from "../controller/EditorController.js";
import { Router } from "express";

let router = Router();

router.get("/", EditorController.home);

export default router;
