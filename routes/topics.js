import { Router } from 'express'
import * as topicsCtrl from '../controllers/topics.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, topicsCtrl.index)
router.post('/', checkAuth, topicsCtrl.create)
// router.get('/:id', checkAuth, topicsCtrl.show)

// indexPosts
router.get('/:topicId/posts', checkAuth, topicsCtrl.indexPosts)
// no longer need to include topicId in req.body
router.post('/:topicId/posts', checkAuth, attributeAuthor, postsCtrl.createPost)


// no longer need to include topicId in req.query
router.get('/:topicId/posts/:postId/iterations', checkAuth, iterationsCtrl.findKeywords)

export { router }