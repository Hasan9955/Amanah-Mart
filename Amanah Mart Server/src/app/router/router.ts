import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";


const router = Router();

const allRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
]


allRoutes.forEach(route => router.use(route.path, route.route))

export const mainRoutes = router;