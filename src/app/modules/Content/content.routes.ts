import express from 'express';
import { contentController } from './content.controller';
import { upload } from '../../../utils';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
const router = express.Router();

router.get('/', contentController.getAllContent);

router.post('/', upload.single('file'), auth(UserRole.ADMIN, UserRole.USER), (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  return contentController.createContent(req, res, next);
});

router.patch('/:id', upload.single('file'), auth(UserRole.ADMIN, UserRole.USER), (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  return contentController.updateContent(req, res, next);
});
export const ContentRouter = router;
