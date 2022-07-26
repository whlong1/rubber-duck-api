import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import * as iterationsCtrl from '../controllers/iterations.js'
import { attributeAuthor, validateVote } from '../middleware/middleware.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 
router.get('/', postsCtrl.index)
router.get('/:id', postsCtrl.show)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.delete('/:id', checkAuth, postsCtrl.delete)
router.post('/', checkAuth, attributeAuthor, postsCtrl.create)
router.patch('/:id/views', checkAuth, postsCtrl.incrementViews)
router.post('/:id/bookmarks', checkAuth, postsCtrl.bookmarkPost)
router.delete('/:id/bookmarks', checkAuth, postsCtrl.removeBookmark)

// Iterations
router.get('/:id/iterations', checkAuth, iterationsCtrl.indexIteration)
router.post('/:id/iterations', checkAuth, iterationsCtrl.createIteration)

router.post('/:postId/iterations/:iterationId/votes', checkAuth, validateVote, iterationsCtrl.castVote)
router.delete('/:postId/iterations/:iterationId/votes', checkAuth, iterationsCtrl.undoVote)

// Comments
router.post('/:postId/iterations/:iterationId/comments', checkAuth, attributeAuthor, iterationsCtrl.createComment)



export { router }