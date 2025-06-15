const { Router } = require('express')

const number = require('joi/lib/types/number')
const { Child } = require('../../models')
const { Settings } = require('../../models')
const {UserStats}= require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const {Level}= require('../../models')

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
      choosefont: 'cursif ecriture A',
      chooseBackGround: 'Aléatoire',
      numberOfWords: 15,
    }
    const newChild={
      id:child.id,
      firstName: child.firstName,
      lastName: child.lastName,
      age: child.age,
      role:'child'
    }
  
    const defaultUserStats = {
      child: newChild,
    
      listLetterErrors: {},
      errorOcurrencesByPosition: {},
  
      progression: [],
      interaction: []
    }
    const level = {
      childId: child.id,
      niveau:0,
      date:new Date()

    }
    console.log(level);
    //UserStats.create(defaultUserStats)
    console.log(123)
    Level.create(level);
    console.log(123)
    const settings = Settings.create(defaultSettings)
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
    const { childId } = req.params;        
    const levels   = Level.get();   // à modifier pr supprimer ttes les occurences (TODO le faire dans baseModel)         
    const childLvl = levels.find(l => l.childId == childId);
    Level.delete(childLvl.id)
    res.status(204).end()
    

  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
