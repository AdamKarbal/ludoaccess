const { Router } = require('express');
const { UserStats } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');
const {mergeInteractions,mergeProgressions} = require('./util.js');

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

router.put('/child/:childId', (req, res) => {
  try {
    const childId = parseInt(req.params.childId, 10);
    const newStats = req.body;

    const existingStats = UserStats.get().find(stat => stat.child.id === childId);

    if (!existingStats) {
      return res.status(404).json({ error: 'Stats not found for this child' });
    }

    const statsId = existingStats.id;

    // 🧠 Cumuler listLetterErrors
    const mergedLetterErrors = { ...existingStats.listLetterErrors };
    for (const [letter, count] of Object.entries(newStats.listLetterErrors)) {
      mergedLetterErrors[letter] = (mergedLetterErrors[letter] || 0) + count;
    }

    // 🧠 Cumuler errorOcurrencesByPosition
    const mergedErrorPositions = { ...existingStats.errorOcurrencesByPosition };
    for (const [lengthStr, newPosMap] of Object.entries(newStats.errorOcurrencesByPosition)) {
      if (!mergedErrorPositions[lengthStr]) {
        mergedErrorPositions[lengthStr] = { ...newPosMap };
      } else {
        for (const [pos, count] of Object.entries(newPosMap)) {
          mergedErrorPositions[lengthStr][pos] = (mergedErrorPositions[lengthStr][pos] || 0) + count;
        }
      }
    }

    // 🧠 Ajouter les nouvelles progressions/interactions
    //const mergedProgression = [...existingStats.progression, ...newStats.progression];
    //const mergedInteraction = [...existingStats.interaction, ...newStats.interaction];
    const mergedProgression=mergeProgressions(existingStats.progression,newStats.progression);
    const mergedInteraction=mergeInteractions(existingStats.interaction,newStats.interaction);
    // 📦 Fusion finale
    const mergedStats = {
      ...existingStats,
      listLetterErrors: mergedLetterErrors,
      errorOcurrencesByPosition: mergedErrorPositions,
      progression: mergedProgression,
      interaction: mergedInteraction
    };

    UserStats.update(statsId, mergedStats);

    res.status(200).json({
      message: 'Stats cumulées avec succès',
      stats: mergedStats
    });

  } catch (err) {
    console.error('❌ Error in PUT /child/:childId:', err);
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







