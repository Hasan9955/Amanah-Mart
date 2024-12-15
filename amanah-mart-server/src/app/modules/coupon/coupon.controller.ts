import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse" 
import { couponServices } from "./coupon.service";


const getAllCoupons = catchAsync(async ( req, res ) => {

    const result = await couponServices.getAllCoupons();
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupons retrieved successfully!",
        data: result
    })
})

const getAllValidCoupons = catchAsync(async ( req, res ) => {

    const result = await couponServices.getAllValidCoupons();
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupons retrieved successfully!",
        data: result
    })
})

const getMyCoupon = catchAsync(async ( req, res ) => {

    const result = await couponServices.getMyCoupon(req.user);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupons retrieved successfully!",
        data: result
    })
})


const getSingleCoupon = catchAsync(async ( req, res ) => {

    const result = await couponServices.getSingleCoupon(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupon retrieved successfully!",
        data: result
    })
})

const createCoupon = catchAsync(async ( req, res ) => {

    const result = await couponServices.createCoupon(req.body);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupon created successfully!",
        data: result
    })
})
const updateCoupon = catchAsync(async ( req, res ) => {

    const result = await couponServices.updateCoupon(req.params.id, req.body);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupon updated successfully!",
        data: result
    })
})

const deleteCoupon = catchAsync(async ( req, res ) => {

    const result = await couponServices.deleteCoupon(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Coupon deleted successfully!",
        data: result
    })
})
 

export const couponControllers = {
    getAllCoupons, 
    getAllValidCoupons,
    getMyCoupon,
    getSingleCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon
}