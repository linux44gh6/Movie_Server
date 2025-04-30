

import express from "express"
import { AuthController } from "./auth.controller"


const router = express.Router()

router.post('/', AuthController.loginUser)
router.post('/forget-password', AuthController.forgetPassword)
// router.post('/reset-password', )

export const AuthRouters = router
