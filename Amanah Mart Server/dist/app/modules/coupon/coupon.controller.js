"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const coupon_service_1 = require("./coupon.service");
const getAllCoupons = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.getAllCoupons();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupons retrieved successfully!",
        data: result
    });
}));
const getAllValidCoupons = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.getAllValidCoupons();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupons retrieved successfully!",
        data: result
    });
}));
const getMyCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.getMyCoupon(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupons retrieved successfully!",
        data: result
    });
}));
const getSingleCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.getSingleCoupon(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupon retrieved successfully!",
        data: result
    });
}));
const createCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.createCoupon(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupon created successfully!",
        data: result
    });
}));
const updateCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.updateCoupon(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupon updated successfully!",
        data: result
    });
}));
const deleteCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponServices.deleteCoupon(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Coupon deleted successfully!",
        data: result
    });
}));
exports.couponControllers = {
    getAllCoupons,
    getAllValidCoupons,
    getMyCoupon,
    getSingleCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon
};
