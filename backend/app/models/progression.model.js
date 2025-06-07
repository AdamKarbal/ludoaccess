const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

const progressionSchema = {
  word: Joi.string().required(),
  completed: Joi.boolean().required(),
  nbError: Joi.number().required(),
  timeSpent: Joi.number().required()
};

module.exports = {
  model: new BaseModel('Progression', progressionSchema),
  schema: Joi.object(progressionSchema)
};
