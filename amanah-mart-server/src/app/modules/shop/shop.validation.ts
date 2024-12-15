import { z } from 'zod';

 

const createShopValidation = z.object({
    name: z.string({
        required_error: 'Shop name is required!',
    }),
    bannerImage: z.string().optional(),
    address: z.string({
        required_error: 'Address is required!',
    }),
    contactEmail: z.string({
        required_error: 'Contact email is required!',
    }),
    contactPhone: z.string({
        required_error: 'Contact phone number is required!',
    }),
    vendorId: z.string({
        required_error: 'Vendor ID is required!',
    }),
    description: z.string({
        required_error: 'Shop description is required!',
    }),
    status: z.enum(['ACTIVE', 'DEACTIVATED', 'BLOCKED'], {
        required_error: 'Shop status is required!',
    }),
})


const updateShopValidation = z.object({
    name: z.string().optional(),
    bannerImage: z.string().optional(),
    address: z.string().optional(),
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
    vendorId: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['ACTIVE', 'DEACTIVATED', 'BLOCKED']).optional(),
})



export const shopValidation = {
    createShopValidation,
    updateShopValidation
}