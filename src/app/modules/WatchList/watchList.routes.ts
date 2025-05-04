import express from 'express';
import { WatchController } from './watchList.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), WatchController.getWatchList);
router.post('/', auth(UserRole.USER, UserRole.ADMIN), WatchController.addToWatchList);

export const WatchListRoutes = router;
