import { Router } from "express";
import { shopController } from "./shop.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploder";




const router = Router();

router.get('/', shopController.getAllShop)

router.get('/:id', shopController.getSingleShop)

router.post('/',
    fileUploader.upload.single("file"),
    authValidation(UserRole.VENDOR),
    shopController.createShop)

router.patch('/:id',
    fileUploader.upload.single("file"),
    authValidation(UserRole.VENDOR, UserRole.VENDOR),
    shopController.updateShop) 

router.delete('/:id', authValidation(UserRole.ADMIN), shopController.deleteShop)


export const shopRoutes = router;