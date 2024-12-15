"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const zodValidation_1 = __importDefault(require("../../middleware/zodValidation"));
const category_validation_1 = require("./category.validation");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get('/', category_controller_1.categoryControllers.getAllCategories);
router.get('/:id', category_controller_1.categoryControllers.getSingleCategory);
router.post('/', (0, zodValidation_1.default)(category_validation_1.createCategoryValidation), (0, authValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), category_controller_1.categoryControllers.createCategory);
router.patch('/:id', (0, zodValidation_1.default)(category_validation_1.updateCategoryValidation), (0, authValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), category_controller_1.categoryControllers.updateCategory);
router.delete('/:id', category_controller_1.categoryControllers.deleteCategory);
exports.categoryRoutes = router;
