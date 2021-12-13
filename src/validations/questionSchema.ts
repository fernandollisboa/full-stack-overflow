import joi from 'joi';

const questionSchema: joi.ObjectSchema = joi.object().keys({
  question: joi.string().min(1).required(),
  student: joi.string().min(1).required(),
  class: joi.string().min(1).required(),
  tags: joi.string().required(),
});

export default questionSchema;
