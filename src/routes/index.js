import { Router } from 'express';
import admin from './admin.js';
import auth from './auth.js';
import editor from './editor.js';
import passport from '../config/passport.js'
import users from './users.js';
let rootRouter = Router();

rootRouter.use('/user', users);
rootRouter.use('/admin', admin);
rootRouter.use('/editor', editor);
rootRouter.use('/auth', auth);

export default rootRouter;