import { Router } from "express";
import { authController } from "./auth.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";



const router = Router();


router.post('/login', authController.loginUser)

router.post('/refresh-token', authController.refreshToken)

router.post('/change-password', authValidation(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), authController.changePassword)

router.post('/forgot-password', authController.forgotPassword)

router.post('/reset-password', authController.resetPassword)


export const authRoutes = router;