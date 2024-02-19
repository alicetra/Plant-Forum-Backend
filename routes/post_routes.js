import { Router } from 'express'
import * as PostController from '../controllers/postController.js'

const router = Router()


// POST / CREATE
router.post('', PostController.createNewPostComment)


export default router