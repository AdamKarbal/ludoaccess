const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Child', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  id: Joi.number().required(),
  imageUrl: Joi.string().optional(),
  level: Joi.number().optional(),
  lastPlayed: Joi.date().optional(),
  playDuration: Joi.number().optional(),
  frequency: Joi.number().optional(),
  age: Joi.number().optional(),
  role: Joi.string().valid('child').required(),
})
