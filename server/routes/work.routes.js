const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/work.controller')
const router = Router()

// admin: /api/work/admin
router.post(
	'/admin/',
	passport.authenticate('jwt', {session: false}),
	upload.array('image', 20),
	ctr.create
)

router.get(
	'/admin/',
	passport.authenticate('jwt', {session: false}),
	ctr.getAll
)

router.get(
	'/admin/:id',
	passport.authenticate('jwt', {session: false}),
	ctr.getById
)

router.put(
	'/admin/:id',
	passport.authenticate('jwt', {session: false}),
	upload.array('image', 12),
	ctr.update
)

router.delete(
	'/admin/:id',
	passport.authenticate('jwt', {session: false}),
	ctr.remove
)

//base: /api/work
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/add/view/:id', ctr.addView)

module.exports = router
