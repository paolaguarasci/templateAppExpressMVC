import AuthController from "../controller/AuthController.js";
import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import passport from "passport";
let router = Router();

router.get("/logout", checkAuth, AuthController.logout);

router.get("/login", AuthController.loginGet);

router.post(
  "/login",
  passport.authenticate("local", {
    session: true,
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  AuthController.loginPost
);

router.get("/registration", AuthController.registrationGet);
router.post("/registration", AuthController.registrationPost);
export default router;
