import joi from 'joi';

const answerSchema: joi.ObjectSchema = joi.object({
  answer: joi.string().min(1).required(),
  userName: joi.string(),
});

export default answerSchema;
