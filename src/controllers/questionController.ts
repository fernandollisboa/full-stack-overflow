import { Request, Response, NextFunction } from 'express';
import statusCode from '../enum/httpStatus';
import questionSchema from '../validations/questionSchema';
import answerSchema from '../validations/answerSchema';
import QuestionError from '../errors/QuestionError';
import QuestionDTO from '../protocols/QuestionDTO';
import * as questionService from '../services/questionService';
import AnswerDTO from '../protocols/AnswerDTO';

export async function postQuestion(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const joiValidation = questionSchema.validate(req.body);
		if (joiValidation.error) {
			throw new QuestionError(joiValidation.error.message);
		}

		const newQuestion: QuestionDTO = req.body;

		if (
			!newQuestion.class.trim() ||
			!newQuestion.question.trim() ||
			!newQuestion.student.trim() ||
			!newQuestion.tags.trim()
		) {
			throw new QuestionError('Please fill all the fields correctly.');
		}

		const createdQuestion = await questionService.createQuestion(newQuestion);

		return res.send({ id: createdQuestion.id }).status(statusCode.CREATED);
	} catch (err) {
		if (err instanceof QuestionError) {
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}

export async function postAnswer(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const joiValidation = answerSchema.validate(req.body);
		if (joiValidation.error) {
			throw new QuestionError(joiValidation.error.message);
		}

		const { id } = req.params;
		const answer: AnswerDTO = {
			questionId: Number(id),
			answeredBy: req.body.userName,
			answer: req.body.answer,
		};

		const answeredQuestion = await questionService.createAnswer(answer);
		return res.status(statusCode.OK).send(answeredQuestion);
	} catch (err) {
		if (err instanceof QuestionError) {
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}

export async function getQuestion(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const { id } = req.params;
		const question = await questionService.getQuestion(Number(id));
		delete question.id;
		return res.status(statusCode.OK).send(question);
	} catch (err) {
		if (err instanceof QuestionError) {
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}

export async function getUnansweredQuestions(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const questions = await questionService.getUnansweredQuestions();
		return res.status(statusCode.OK).send(questions);
	} catch (err) {
		if (err instanceof QuestionError) {
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}
