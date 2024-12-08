import { z } from 'zod';




export const createCouponValidation = z.object({
    body: z.object({
        code: z.string().min(1, 'Coupon code is required').max(50, 'Coupon code must be less than 50 characters'),
        description: z.string().optional(),
        discount: z.number().min(0, 'Discount must be a positive number').max(100, 'Discount cannot exceed 100%'),
        minSpend: z.number().min(0, 'Minimum spend must be a positive number').optional(),
        expiresAt: z.string().datetime({ message: 'Expiry date must be a valid datetime string' }),
        isActive: z.boolean().optional().default(true),
        createdBy: z.enum(['ADMIN', 'VENDOR'], {
            required_error: 'CreatedBy is required',
            invalid_type_error: 'CreatedBy must be either ADMIN or VENDOR'
        }),
        shopId: z.string().optional(),
        usageLimit: z.number().int().min(0, 'Usage limit must be a non-negative integer').optional(),
    })
});
