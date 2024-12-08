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
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponServices = void 0;
const prisma_1 = require("../../utils/prisma");
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.coupon.findMany();
    return result;
});
const getAllValidCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const result = yield prisma_1.prisma.coupon.findMany({
        where: {
            isActive: true,
            expiresAt: { gte: today },
            OR: [
                { usageLimit: null },
                { usageCount: { lt: prisma_1.prisma.coupon.fields.usageLimit } }
            ]
        }
    });
    return result;
});
const getMyCoupon = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (user.role === 'ADMIN') {
        result = yield prisma_1.prisma.coupon.findMany({
            where: {
                createdBy: 'ADMIN'
            }
        });
    }
    else if (user.role === 'VENDOR') {
        result = yield prisma_1.prisma.coupon.findMany({
            where: {
                createdBy: 'VENDOR',
                shop: {
                    vendorId: user.Id
                }
            }
        });
    }
    return result;
});
const getSingleCoupon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.coupon.findFirstOrThrow({
        where: {
            id
        }
    });
    return result;
});
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.coupon.create({
        data: payload
    });
});
const updateCoupon = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.coupon.findFirstOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.coupon.update({
        where: {
            id
        },
        data: payload
    });
});
const deleteCoupon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.coupon.findFirstOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.coupon.delete({
        where: {
            id
        }
    });
});
exports.couponServices = {
    getAllCoupons,
    getAllValidCoupons,
    getMyCoupon,
    getSingleCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon
};
