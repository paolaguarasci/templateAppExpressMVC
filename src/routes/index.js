import IndexController from "../controller/IndexController.js"
import { Router } from "express";
import admin from "./admin.js";
import auth from "./auth.js";
import editor from "./editor.js";
import users from "./users.js";

let rootRouter = Router();

rootRouter.use("/user", users);
rootRouter.use("/admin", admin);
rootRouter.use("/editor", editor);
rootRouter.use("/auth", auth);

rootRouter.get("/", IndexController.home);

export default rootRouter;
