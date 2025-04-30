import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { CommentController } from './comments.controller';

const router = express.Router();

router.post('/', auth(UserRole.USER), CommentController.addComments);


export const CommentsRoutes = router;
