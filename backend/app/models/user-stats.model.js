const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const { schema: progressionSchema } = require('./progression.model')
const { schema: interactionSchema } = require('./interaction.model')

const childSchema = Joi.object({
  id: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  level: Joi.number().default(0),
  lastPlayed: Joi.date().default(() => new Date(), 'time now'),
  playDuration: Joi.number().default(0),
  frequency: Joi.number().default(0),
})

module.exports = new BaseModel('UserStats', {
  child: childSchema.required(),


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
