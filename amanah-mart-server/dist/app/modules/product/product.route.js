"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.productControllers.getAllProduct);
router.get('/:id', product_controller_1.productControllers.getSingleProduct);
router.post('/', (0, authValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), product_controller_1.productControllers.createProduct);
router.patch('/', (0, authValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), product_controller_1.productControllers.updateProduct);
router.delete('/:id', product_controller_1.productControllers.deleteProduct);
exports.productRoutes = router;
