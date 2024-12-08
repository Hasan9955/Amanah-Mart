"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const shop_route_1 = require("../modules/shop/shop.route");
const product_route_1 = require("../modules/product/product.route");
const category_route_1 = require("../modules/category/category.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const notification_route_1 = require("../modules/notification/notification.route");
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: '/user',
        route: user_route_1.userRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    },
    {
        path: '/shop',
        route: shop_route_1.shopRoutes
    },
    {
        path: '/product',
        route: product_route_1.productRoutes
    },
    {
        path: '/category',
        route: category_route_1.categoryRoutes
    },
    {
        path: '/coupon',
        route: coupon_route_1.couponRoutes
    },
    {
        path: '/notification',
        route: notification_route_1.notificationRoutes
    },
];
allRoutes.forEach(route => router.use(route.path, route.route));
exports.mainRoutes = router;
