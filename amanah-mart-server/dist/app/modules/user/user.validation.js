"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'Email is required!',
    })
        .email('Invalid email format!'),
    name: zod_1.z.string({
        required_error: 'Name is required!',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required!',
    }),
    role: zod_1.z.enum(['ADMIN', 'VENDOR', 'CUSTOMER'], {
        required_error: 'Role is required!',
    }),
    address: zod_1.z.string({
        required_error: 'Address is required!',
    }),
    phoneNumber: zod_1.z.string({
        required_error: 'Phone number is required!',
    })
});
const updateUserValidation = zod_1.z.object({
    name: zod_1.z.string().optional(),
    role: zod_1.z.enum(['ADMIN', 'VENDOR', 'CUSTOMER']).optional(),
    address: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional()
});
exports.userValidation = {
    createUserValidation,
    updateUserValidation
};
