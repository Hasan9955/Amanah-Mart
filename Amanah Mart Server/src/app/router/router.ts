import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";


const router = Router();

const allRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
]


allRoutes.forEach(route => router.use(route.path, route.route))

export const mainRoutes = router;