const { Router } = require('express')

const { Child } = require('../../models')
const { Settings } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const number = require('joi/lib/types/number')

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
      choosefont: 'Nintendo',
      chooseBackGround: 'Aléatoire',
      numberOfWords: 15,
    };
    
    const settings = Settings.create(defaultSettings);
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
    Child.delete(req.params.childId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
