const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const { schema: progressionSchema } = require('./progression.model')
const { schema: interactionSchema } = require('./interaction.model')

const childSchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  level: Joi.number().optional(),
  lastPlayed: Joi.date().optional(),
  playDuration: Joi.number().optional(),
  frequency: Joi.number().optional(),
  age: Joi.number().optional(),
  role: 'child',
})

module.exports = new BaseModel('UserStats', {
  child: childSchema.required(),

  nbError: Joi.number().required(),

  listLetterErrors: Joi.object().pattern(
    Joi.string(), Joi.number().required(),
  ).required(),

  errorOcurrencesByPosition: Joi.object().pattern(
    Joi.string(), Joi.object().pattern(
      Joi.string(), Joi.number().required(),
    ).required(),
  ).required(),

  progression: Joi.array().items(progressionSchema).required(),
  interaction: Joi.array().items(interactionSchema).required(),
})
