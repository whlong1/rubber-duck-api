import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import * as iterationsCtrl from '../controllers/iterations.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 
router.get('/', postsCtrl.index)
router.get('/:id', postsCtrl.show)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.delete('/:id', checkAuth, postsCtrl.delete)
router.post('/', checkAuth, postsCtrl.create)
router.patch('/:id/views', checkAuth, postsCtrl.incrementViews)
router.post('/:id/bookmarks', checkAuth, postsCtrl.bookmarkPost)
router.delete('/:id/bookmarks', checkAuth, postsCtrl.removeBookmark)

// Iterations

router.post('/:id/iterations', checkAuth, postsCtrl.createIteration)
router.post('/:id/iterations', checkAuth, postsCtrl.createIteration)



export { router }