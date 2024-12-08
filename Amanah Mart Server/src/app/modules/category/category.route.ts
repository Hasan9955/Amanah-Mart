import { Router } from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middleware/zodValidation";
import { createCategoryValidation, updateCategoryValidation } from "./category.validation";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";


const router = Router();


router.get('/', categoryControllers.getAllCategories)

router.get('/:id', categoryControllers.getSingleCategory)

router.post('/',
    validateRequest(createCategoryValidation),
    authValidation(UserRole.ADMIN, UserRole.VENDOR),
    categoryControllers.createCategory)

router.patch('/:id',
    validateRequest(updateCategoryValidation),
    authValidation(UserRole.ADMIN, UserRole.VENDOR),
    categoryControllers.updateCategory)

router.delete('/:id', categoryControllers.deleteCategory)

export const categoryRoutes = router;