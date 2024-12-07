import { z } from "zod";




const createUserValidation = z.object({
    email: z.string({
        required_error: 'Email is required!',
    })
        .email('Invalid email format!'),
    name: z.string({
        required_error: 'Name is required!',
    }),
    password: z.string({
        required_error: 'Password is required!',
    }),
    role: z.enum(['ADMIN', 'VENDOR', 'CUSTOMER'], {
        required_error: 'Role is required!',
    }),
    address: z.string({
        required_error: 'Address is required!',
    }),
    phoneNumber: z.string({
        required_error: 'Phone number is required!',
    })
});


const updateUserValidation = z.object({ 
    name: z.string().optional(),
    role: z.enum(['ADMIN', 'VENDOR', 'CUSTOMER']).optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional()
});


export const userValidation = {
    createUserValidation,
    updateUserValidation
}