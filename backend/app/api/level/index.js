const {Router} = require('express');
const {getLevelByChildId,updateLevelByChildId, createLevel, deleteLevelByChildId} = require('./manager');

const router=new Router();

router.post('/', createLevel);
router.get('/:childId', getLevelByChildId);
// router.put('/:childId', updateLevelByChildId);
//router.delete('/:childId', deleteLevelByChildId);

module.exports = router;
