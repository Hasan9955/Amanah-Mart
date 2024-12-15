"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidation = void 0;
const zod_1 = require("zod");
const createShopValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Shop name is required!',
    }),
    bannerImage: zod_1.z.string().optional(),
    address: zod_1.z.string({
        required_error: 'Address is required!',
    }),
    contactEmail: zod_1.z.string({
        required_error: 'Contact email is required!',
    }),
    contactPhone: zod_1.z.string({
        required_error: 'Contact phone number is required!',
    }),
    vendorId: zod_1.z.string({
        required_error: 'Vendor ID is required!',
    }),
    description: zod_1.z.string({
        required_error: 'Shop description is required!',
    }),
    status: zod_1.z.enum(['ACTIVE', 'DEACTIVATED', 'BLOCKED'], {
        required_error: 'Shop status is required!',
    }),
});
const updateShopValidation = zod_1.z.object({
    name: zod_1.z.string().optional(),
    bannerImage: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    contactEmail: zod_1.z.string().optional(),
    contactPhone: zod_1.z.string().optional(),
    vendorId: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['ACTIVE', 'DEACTIVATED', 'BLOCKED']).optional(),
});
exports.shopValidation = {
    createShopValidation,
    updateShopValidation
};
