const { Router } = require('express')
const { Child, Settings, UserStats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const express = require('express');
const app = express();

app.use(express.json())

const router = new Router()
router.get('/', (req, res) => {
  try {
    res.status(200).json(Child.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})
router.get('/:childId', (req, res) => {
  try {
    res.status(200).json(Child.getById(req.params.childId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})
router.get('/:childId/stats', (req, res) => {
  try {
    const childId = req.params.childId;
    const child = Child.getById(childId);

    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    const userStat = UserStats.get().find(stat => stat.child.id === childId);

    if (!userStat) {
      return res.status(404).json({ error: 'UserStats not found for this child' });
    }

    res.status(200).json(userStat);
  } catch (err) {
    manageAllErrors(res, err);
  }
});

router.post('/', (req, res) => {
  try {
    const child = Child.create({ ...req.body })
  

    const defaultSettings = {
      id: child.id,
      showTimer: true,
      showRanking: false,
      enableLifeLoss: false,
      jumpDifficulty: false,
      clearWordAfterRecovery: false,
      adaptDifficulty: false,
      displaymotsec: 10,
      simplifyGameAfter: 30,
      wordWritingTime: 30,
      wordDifficulty: 'Facile',
      lettersize: 'Moyen',
      choosefont: 'cursif ecriture A',
      chooseBackGround: 'Aléatoire',
      numberOfWords: 15,
    }
    Settings.create(defaultSettings);
    const newChild={
      id:child.id,
      firstName: child.firstName,
      lastName: child.lastName,
      role:child.role
    }
    const defaultUserStats = {
      child: newChild,
      nbError: 0,
      listLetterErrors: {},
      errorOcurrencesByPosition: {},
      progression: [],
      interaction: [],
    }
    UserStats.create(defaultUserStats)
    res.status(201).json(child)
    console.log('child dans le back', child)
  } catch (err) {
    manageAllErrors(res, err)
  }
})
router.put('/:childId', (req, res) => {
  try {
    res.status(200).json(Child.update(req.params.childId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})
router.delete('/:childId', (req, res) => {
  try {
    const childId = parseInt(req.params.childId, 10);
    Child.delete(req.params.childId)
    Settings.delete(childId);
    const userStatsList = UserStats.get();
    const stat = userStatsList.find(stat => stat.child.id === childId);
    if (stat) {
      UserStats.delete(stat.id);
    }
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})
module.exports = router