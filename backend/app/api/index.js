const { Router } = require('express')
const ChildRouter = require('./childs')
const ErgoRouter = require('./ergos')
const SettingRouter = require('./settings')
const WordRouter = require('./words')
const LevelRouter = require('./level')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/childs', ChildRouter)
router.use('/ergos', ErgoRouter)
router.use('/settings', SettingRouter)
router.use('/words', WordRouter)
router.use('/level',LevelRouter)


module.exports = router
