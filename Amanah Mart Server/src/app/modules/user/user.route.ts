import { Router } from "express";
import { userControllers } from "./user.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";



const router = Router();


router.get('/', userControllers.getAll)

router.get('/my-profile', authValidation(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR), userControllers.myProfile)

router.post('/', userControllers.createUser)

router.patch('/', userControllers.updateUser)

router.delete('/', userControllers.deleteUser)



export const userRoutes = router;

