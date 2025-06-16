const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Word' , {
    value: Joi.string().required(),
    level: Joi.number().required(),
    childId: Joi.number().required(),
})

