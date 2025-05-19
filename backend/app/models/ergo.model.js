const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Ergo', {
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    id: Joi.number().required(),
    imageUrl: Joi.string().optional(),
    age : Joi.number().optional(),
    role: Joi.string().valid('ergo').required(),
})
