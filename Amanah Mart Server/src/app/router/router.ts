import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { shopRoutes } from "../modules/shop/shop.route";


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
    {
        path: '/shop',
        route: shopRoutes
    },
]


allRoutes.forEach(route => router.use(route.path, route.route))

export const mainRoutes = router;