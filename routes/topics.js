import { Router } from 'express'
import * as topicsCtrl from '../controllers/topics.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, topicsCtrl.index)
router.post('/', checkAuth, topicsCtrl.create)
router.get('/:id', checkAuth, topicsCtrl.show)
router.get('/:id/posts', checkAuth, topicsCtrl.findPostByTopic)


export { router }