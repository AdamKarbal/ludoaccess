const Joi= require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Level', {
    childId: Joi.number().required(),
    niveau: Joi.number().required(),
    date :Joi.date().required()
});