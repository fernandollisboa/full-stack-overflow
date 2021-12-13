import { Router } from 'express';
import * as questionController from '../controllers/questionController';
import auth from '../middlewares/auth';
const router = Router();

router.post('/questions', questionController.postQuestion);
router.get('/questions/:id', questionController.getQuestion);
router.post('/questions/:id', auth, questionController.postAnswer);
router.get('/questions', questionController.getUnansweredQuestions);

export default router;
