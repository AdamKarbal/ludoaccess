const { Router } = require('express')

const { Ergo } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(UserStats.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:statsId', (req, res) => {
  try {
    res.status(200).json(UserStats.getById(req.params.ergoId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = UserStats.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})
