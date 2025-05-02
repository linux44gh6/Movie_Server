

import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { TagController } from './tag.controller';


const router = express.Router()

router.get('/', auth(UserRole.ADMIN, UserRole.USER), TagController.getAllTags)


export const TagRoutes = router
