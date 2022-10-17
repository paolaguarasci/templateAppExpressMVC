import AuthController from '../controller/AuthController.js';
import { Router } from 'express';
import passport from '../config/passport.js';
let router = Router();

router.get('/login', AuthController.loginGet);
// router.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/auth/login' }),
//   AuthController.loginPost
// );

export default router;
