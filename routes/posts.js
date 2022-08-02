import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import * as iterationsCtrl from '../controllers/iterations.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { attributeAuthor, validateVote } from '../middleware/middleware.js'

const router = Router()

// ========= Public Routes ========= 

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, postsCtrl.show)
router.delete('/:id', checkAuth, postsCtrl.delete)
router.patch('/:id/views', checkAuth, postsCtrl.incrementViews)
router.post('/:id/bookmarks', checkAuth, postsCtrl.bookmarkPost)
router.delete('/:id/bookmarks', checkAuth, postsCtrl.removeBookmark)
router.delete('/:postId/iterations/:iterationId/votes', checkAuth, iterationsCtrl.undoVote)
router.post('/:postId/iterations/:iterationId/votes', checkAuth, validateVote, iterationsCtrl.castVote)
router.post('/:postId/iterations/:iterationId/comments', checkAuth, attributeAuthor, iterationsCtrl.createComment)

export { router }