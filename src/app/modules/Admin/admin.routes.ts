

import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

router.patch('/review/:id', AdminController.approveOrUnpublishReview)
router.patch('/comment/:id', AdminController.approveOrUnpublishComment)
router.delete('/remove-inappropriate-review/:id', AdminController.removeInappropriateReview)

export const AdminRoute = router


