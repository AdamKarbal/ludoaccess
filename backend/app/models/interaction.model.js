const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

const interactionSchema = {
  action: Joi.string().required(),
  success: Joi.number().required(),
  failures: Joi.number().required(),
  timeSpent: Joi.number().required()
};

module.exports = {
  model: new BaseModel('Interaction', interactionSchema),
  schema: Joi.object(interactionSchema)
};
