import { Router } from "express";
import { couponControllers } from "./coupon.controller";



const router = Router();


router.get('/all-coupon', couponControllers.getAllCoupons)

router.get('/', couponControllers.getAllValidCoupons)

router.get('/my-coupon', couponControllers.getMyCoupon)

router.get('/:id', couponControllers.getSingleCoupon)

router.post('/', couponControllers.createCoupon)

router.patch('/:id', couponControllers.updateCoupon)

router.delete('/:id', couponControllers.deleteCoupon)



export const couponRoutes = router;