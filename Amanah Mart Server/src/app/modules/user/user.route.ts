import { Router } from "express";
import { userControllers } from "./user.controller";



const router = Router();


router.get('/', userControllers.getAll)

router.get('/me/:id', userControllers.getMe)

router.post('/', userControllers.createUser)

router.patch('/', userControllers.updateUser)

router.delete('/', userControllers.deleteUser)



export const userRoutes = router;

