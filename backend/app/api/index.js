const { Router } = require('express')
const ChildRouter = require('./childs')
const ErgoRouter = require('./ergos')
const SettingRouter = require('./settings')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/childs', ChildRouter)
router.use('/ergos', ErgoRouter)
router.use('/settings', SettingRouter)



module.exports = router
