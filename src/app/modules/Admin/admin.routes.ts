

import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

router.patch('/review/:id', AdminController.approveOrUnpublishReview)

export const AdminRoute = router
