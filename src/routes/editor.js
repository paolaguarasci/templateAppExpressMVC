import EditorController from '../controller/EditorController.js';
import {Router} from 'express';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';
const router = Router();

router.get('/', checkAuth, checkRole('editor'), EditorController.home);

export default router;
