"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCouponValidation = void 0;
const zod_1 = require("zod");
exports.createCouponValidation = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(1, 'Coupon code is required').max(50, 'Coupon code must be less than 50 characters'),
        description: zod_1.z.string().optional(),
        discount: zod_1.z.number().min(0, 'Discount must be a positive number').max(100, 'Discount cannot exceed 100%'),
        minSpend: zod_1.z.number().min(0, 'Minimum spend must be a positive number').optional(),
        expiresAt: zod_1.z.string().datetime({ message: 'Expiry date must be a valid datetime string' }),
        isActive: zod_1.z.boolean().optional().default(true),
        createdBy: zod_1.z.enum(['ADMIN', 'VENDOR'], {
            required_error: 'CreatedBy is required',
            invalid_type_error: 'CreatedBy must be either ADMIN or VENDOR'
        }),
        shopId: zod_1.z.string().optional(),
        usageLimit: zod_1.z.number().int().min(0, 'Usage limit must be a non-negative integer').optional(),
    })
});
