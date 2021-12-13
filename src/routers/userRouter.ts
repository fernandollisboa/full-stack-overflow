import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/users', userController.postUser);

export default router;
