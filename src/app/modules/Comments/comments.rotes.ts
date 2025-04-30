import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { CommentController } from './comments.controller';

const router = express.Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), CommentController.getAllComment);
router.post('/', auth(UserRole.USER), CommentController.addComments);
router.patch('/edit-comment/:id', auth(UserRole.USER), CommentController.editComment);

export const CommentsRoutes = router;
