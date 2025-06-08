const { Router } = require('express');
const { UserStats } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');

const router = new Router();


// ✅ GET user stats by child ID (specific route - must come first)
router.get('/child/:childId', (req, res) => {
  try {
    const childId = parseInt(req.params.childId, 10);

    const stat = UserStats.get().find(stat => stat.child.id === childId);

    if (!stat) {
      console.warn('⚠️ No stats found for child ID:', childId);
      return res.status(404).json({ error: 'UserStats not found for this child' });
    }

    res.status(200).json(stat);
  } catch (err) {
    console.error('❌ Error in /child/:childId:', err);
    manageAllErrors(res, err);
  }
});

// 🔁 GET stats by internal stat ID (less common, must come second)
router.get('/:statsId', (req, res) => {
  try {
    const stat = UserStats.getById(req.params.statsId);

    if (!stat) {
      return res.status(404).json({ error: 'UserStats not found' });
    }

    res.status(200).json(stat);
  } catch (err) {
    console.error('❌ Error in /:statsId:', err);
    manageAllErrors(res, err);
  }
});

// 📋 GET all user stats (optional)
router.get('/', (req, res) => {
  try {
    res.status(200).json(UserStats.get());
  } catch (err) {
    console.error('❌ Error in /stats:', err);
    manageAllErrors(res, err);
  }
});

module.exports = router;
