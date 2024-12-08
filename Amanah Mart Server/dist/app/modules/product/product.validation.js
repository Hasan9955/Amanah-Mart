"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductValidation = void 0;
const zod_1 = require("zod");
exports.createProductValidation = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    discountPercent: zod_1.z.number().min(0).max(100).optional(),
    stock: zod_1.z.number().int().min(0, 'Stock must be a non-negative integer'),
    isFeatured: zod_1.z.boolean().optional().default(false),
    isAvailable: zod_1.z.boolean().optional().default(true),
    averageRatings: zod_1.z.number().min(0).max(5).optional(),
    purchaseCount: zod_1.z.number().int().min(0).optional(),
    brand: zod_1.z.string().optional().default('NO BRAND'),
    expiryDate: zod_1.z.string().datetime().optional(),
    weight: zod_1.z.number().min(0).optional(),
    categoryId: zod_1.z.string(),
    shopId: zod_1.z.string(),
});
