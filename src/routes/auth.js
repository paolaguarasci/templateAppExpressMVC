import AuthController from '../controller/AuthController.js';
import { Router } from 'express';

let router = Router();

router.get('/', AuthController.loginGet);
router.post('/', AuthController.loginPost);

export default router;
