const { Router } = require('express');
const { getAllWords, createWord, deleteWord, createWords } = require('./manager');

const router = new Router();

router.get('/', getAllWords);
router.post('/', createWord);
router.post('/createAll', createWords); 
router.delete('/:wordValue', deleteWord);

module.exports = router;
