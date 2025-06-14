const { Router } = require('express')

const number = require('joi/lib/types/number')
const { Child } = require('../../models')
const { Settings } = require('../../models')
const {UserStats}= require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

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

router.post('/', (req, res) => {
  console.log(123);
  try {
    const child = Child.create({ ...req.body })
     console.log(456);
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
    // const defaultUserStats = {
    //   child: newChild,
    //   nbError: 0,
    //   listLetterErrors: {},
    //   errorOcurrencesByPosition: {},
    //   nbFailed: [],
    //   progression: [],
    //   interaction: []
    // }
    //  console.log(1111111111111);
    // // UserStats.create(defaultUserStats)
    //  console.log(789);
    const settings = Settings.create(defaultSettings)
    console.log(10);
    res.status(201).json(child)
    console.log('child dans le back', child)
  } catch (err) {
    console.log('erreur dans le back', err);
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
    Child.delete(req.params.childId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
