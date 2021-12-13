import { Router } from 'express';
import * as questionController from '../controllers/questionController';
const router = Router();

router.post('/questions', questionController.postQuestion);

export default router;
