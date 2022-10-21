import AuthController from "../controller/AuthController.js";
import { Router } from "express";
import { body } from "express-validator";
import checkAuth from "../middleware/checkAuth.js";
import checkValidation from "../middleware/checkValidation.js";
import passport from "passport";
const router = Router();

router.get("/logout", checkAuth, AuthController.logout);
router.get("/login", AuthController.loginGet);
router.post(
  "/login",
  body("username")
    .trim()
    .isLength({ min: 8, max: 15 })
    .isAlphanumeric()
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .matches(/^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{8,32}$/),
  checkValidation,
  passport.authenticate("local", {
    session: true,
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  AuthController.loginPost
);
router.get("/registration", AuthController.registrationGet);
router.post(
  "/registration",
  body("username")
    .trim()
    .isAlphanumeric()
    .isLength({ min: 8, max: 15 })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .matches(/^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{8,32}$/),
  checkValidation,
  AuthController.registrationPost
);

export default router;
