import { Router } from "express";
import { userControllers } from "./user.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploder";



const router = Router();


router.get('/',
    authValidation(UserRole.ADMIN),
    userControllers.getAll)

router.get('/my-profile', authValidation(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR), userControllers.myProfile)

router.post('/',
    fileUploader.upload.single("file"),
    userControllers.createUser)

router.patch('/:id',
    fileUploader.upload.single("file"),
    userControllers.updateUser)

router.delete('/',
    authValidation(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
    userControllers.softDelete)

router.delete('/delete/:id',
    authValidation(UserRole.ADMIN),
    userControllers.deleteUser)



export const userRoutes = router;

