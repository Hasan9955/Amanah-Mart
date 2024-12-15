import { z } from 'zod';



const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  totalPrice: z.number().positive({ message: 'Total price must be a positive number' }),
});



const orderSchema = z.object({
  customerId: z.string().uuid({ message: 'Invalid Customer ID format' }),
  shopId: z.string().uuid({ message: 'Invalid Shop ID format' }),
  totalAmount: z.number().positive({ message: 'Total amount must be a positive number' }),
  couponId: z.string().uuid().optional().nullable(),
  status: z.enum(['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED', 'PAYMENT_PENDING'], { message: 'Invalid status value' }).default('PAYMENT_PENDING'),
  items: z.array(orderItemSchema).nonempty({ message: 'At least one order item is required' }),
});

export { orderSchema, orderItemSchema };
