

import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

router.patch('/review/:id', AdminController.approveOrUnpublishReview)
router.patch('/comment/:id', AdminController.approveOrUnpublishComment)

export const AdminRoute = router
