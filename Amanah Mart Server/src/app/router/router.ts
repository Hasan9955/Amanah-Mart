import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { shopRoutes } from "../modules/shop/shop.route";
import { productRoutes } from "../modules/product/product.route";


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
    {
        path: '/product',
        route: productRoutes
    },
]


allRoutes.forEach(route => router.use(route.path, route.route))

export const mainRoutes = router;