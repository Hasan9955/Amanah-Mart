import { Router } from "express";
import { productControllers } from "./product.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";



const router = Router();


router.get('/', productControllers.getAllProduct)

router.get('/:id', productControllers.getSingleProduct)

router.post('/', 
    authValidation(UserRole.ADMIN, UserRole.VENDOR),
    productControllers.createProduct)

router.patch('/',
    authValidation(UserRole.ADMIN, UserRole.VENDOR),
    productControllers.updateProduct)

router.delete('/:id', productControllers.deleteProduct)

export const productRoutes = router;