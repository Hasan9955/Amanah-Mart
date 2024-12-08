import { z } from 'zod';

export const createNotificationSchema = z.object({ 
  userId: z.string(),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  isRead: z.boolean().optional().default(false),
  redirectTo: z.string().optional()  
});
