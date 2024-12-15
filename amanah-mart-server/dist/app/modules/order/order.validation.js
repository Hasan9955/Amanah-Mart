"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemSchema = exports.orderSchema = void 0;
const zod_1 = require("zod");
const orderItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(1, { message: 'Quantity must be at least 1' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    totalPrice: zod_1.z.number().positive({ message: 'Total price must be a positive number' }),
});
exports.orderItemSchema = orderItemSchema;
const orderSchema = zod_1.z.object({
    customerId: zod_1.z.string().uuid({ message: 'Invalid Customer ID format' }),
    shopId: zod_1.z.string().uuid({ message: 'Invalid Shop ID format' }),
    totalAmount: zod_1.z.number().positive({ message: 'Total amount must be a positive number' }),
    couponId: zod_1.z.string().uuid().optional().nullable(),
    status: zod_1.z.enum(['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED', 'PAYMENT_PENDING'], { message: 'Invalid status value' }).default('PAYMENT_PENDING'),
    items: zod_1.z.array(orderItemSchema).nonempty({ message: 'At least one order item is required' }),
});
exports.orderSchema = orderSchema;
