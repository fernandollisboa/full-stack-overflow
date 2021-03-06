import joi from 'joi';

const userSchema: joi.ObjectSchema = joi.object().keys({
  name: joi.string().min(1).required(),
  class: joi.string().min(1).required(),
});

export default userSchema;
