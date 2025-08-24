import express from 'express';
import { paymentController } from './payment.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();


router.get('/', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPayment)

router.get('/:id', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPaymentByUser)

router.post('/', auth(UserRole.ADMIN, UserRole.USER), paymentController.payment)

router.post('/success/:tId', paymentController.successController)

router.patch('/payment-approved/:id',auth(UserRole.ADMIN),paymentController.updateAdminStatus)

router.delete('/rejected-payment/:paymentId',auth(UserRole.ADMIN),paymentController.rejectPayment)
router.delete('/payment/failed/:tId', paymentController.failedController)

export const paymentRouter = router
