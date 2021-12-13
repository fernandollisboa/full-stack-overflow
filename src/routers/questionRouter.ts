import { Router } from 'express';
import * as questionController from '../controllers/questionController';
import auth from '../middlewares/auth';
const router = Router();

router.post('/questions', questionController.postQuestion);
router.post('/questions/:id', auth, questionController.postAnswer);

export default router;
