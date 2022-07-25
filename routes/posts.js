import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import * as iterationsCtrl from '../controllers/iterations.js'
import { attributeAuthor } from '../middleware/middleware.js'
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
router.post('/:id/iterations', checkAuth, iterationsCtrl.createIteration)
router.post('/:id/iterations/:iterationId', checkAuth, iterationsCtrl.castVote)
router.delete('/:id/iterations/:iterationId', checkAuth, iterationsCtrl.undoVote)

// Comments
router.post('/:id/iterations/:iterationId/comments/:commentId', checkAuth, attributeAuthor, iterationsCtrl.createComment)



export { router }