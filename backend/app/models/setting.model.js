const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Settings', {
  id: Joi.number().required(),
  showTimer: Joi.boolean().required(),
  showRanking: Joi.boolean().required(),
  enableLifeLoss: Joi.boolean().required(),
  jumpDifficulty: Joi.boolean().required(),
  adaptDifficulty: Joi.boolean().required(),
  clearWordAfterRecovery: Joi.boolean().required(),
  displaymotsec: Joi.number().required(),
  wordWritingTime: Joi.number().required(),
  wordDifficulty: Joi.string().valid('Facile', 'Moyen', 'Difficile').required(),
  simplifyGameAfter: Joi.number().optional(),
  choosefont: Joi.string().valid(
    'Lucky Boy', 'Nintendo', 'Arial', 'Comic Sans MS', 'Courier New',
    'Georgia', 'Times New Roman', 'Verdana', 'Calibri',
    'cursif ecriture A', 'cursif ecriture B', 'Minecraft'
  ).required(),
  chooseBackGround: Joi.string().valid(
    'Forest', 'Blue_earth', 'Orange_earth', 'Aléatoire'
  ).required(),
  lettersize: Joi.string().valid('Petit', 'Moyen', 'Grand').required()
});