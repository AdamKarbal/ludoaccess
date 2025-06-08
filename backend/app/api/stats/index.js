const { Router } = require('express')

const { UserStats } = require('../../models') // you forgot this import
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

// GET all user stats
router.get('/', (req, res) => {
  try {
    res.status(200).json(UserStats.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

// GET user stats by internal stats ID (not usually needed, but kept for completeness)
router.get('/:statsId', (req, res) => {
  try {
    const stat = UserStats.getById(req.params.statsId)
    if (!stat) {
      return res.status(404).json({ error: 'UserStats not found' })
    }
    res.status(200).json(stat)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

// ✅ GET user stats by childId
router.get('/child/:childId', (req, res) => {
  try {
    const childId = parseInt(req.params.childId, 10)
    const stat = UserStats.get().find((stat) => stat.child.id === childId)

    if (!stat) {
      return res.status(404).json({ error: 'UserStats not found for this child' })
    }

    res.status(200).json(stat)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

// POST a new user stat (usually handled when creating a child)
router.post('/', (req, res) => {
  try {
    const user = UserStats.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
