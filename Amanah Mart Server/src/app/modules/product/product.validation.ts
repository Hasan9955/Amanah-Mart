

import { z } from 'zod';

export const createProductValidation = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(0, 'Price must be a positive number'),
    discountPercent: z.number().min(0).max(100).optional(),
    stock: z.number().int().min(0, 'Stock must be a non-negative integer'), 
    isFeatured: z.boolean().optional().default(false),
    isAvailable: z.boolean().optional().default(true),
    averageRatings: z.number().min(0).max(5).optional(),
    purchaseCount: z.number().int().min(0).optional(),
    brand: z.string().optional().default('NO BRAND'),
    expiryDate: z.string().datetime().optional(),
    weight: z.number().min(0).optional(),
    categoryId: z.string(),
    shopId: z.string(),
  })



