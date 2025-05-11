const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Child', {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    id: Joi.string().required(),
    imageUrl: Joi.string().optional(),
    age : Joi.number().optional(),
    role: Joi.string().valid('ergo').required(),
})
