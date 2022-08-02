import { Router } from 'express'
import * as topicsCtrl from '../controllers/topics.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { attributeAuthor, validateVote } from '../middleware/middleware.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, topicsCtrl.index)
router.post('/', checkAuth, topicsCtrl.create)

router.get('/:topicId/posts', checkAuth, topicsCtrl.indexPosts)
router.post('/:topicId/posts', checkAuth, attributeAuthor, topicsCtrl.createPost)
router.get('/:topicId/posts/:postId/iterations', checkAuth, topicsCtrl.findKeywords)

export { router }