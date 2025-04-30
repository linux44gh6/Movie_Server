

import express from 'express'
import { auth } from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { ReviewController } from './reviews.controller'

const router = express.Router()

router.post('/', auth(UserRole.USER), ReviewController.addReview)

export const ReviewRoutes = router
